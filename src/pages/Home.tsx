import type { FC } from "react";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { type LatLngExpression } from "leaflet";
import { getRelativeTime } from "../utils/getDisplayDate";
// import DevicesSelect from "../DevicesSelect";
// import DeviceSettings from "../DeviceSettings";
import SideBanner from "../SideBanner";
// import AccountMenu from "../AccountMenu";
import { useDevicesPooling } from "../queries/devices";
import { useGetRoute } from "../queries/route";
import CommandCenter from "../components/CommandCenter";
import Loading from "../components/Loading";
import NavDrawer from "../components/NavDrawer";
import HomeMap from "../components/home/Map";
import TopNav from "../components/TopNav";
import Box from "@mui/material/Box";

interface Props {}

const Home: FC<Props> = () => {
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [deviceId, setDeviceId] = useState<string>(
    localStorage.getItem("selectedDeviceId") ?? ""
  );
  const [showRoute, setShowRoute] = useState<boolean>(
    !!localStorage.getItem("showRoute")
  );
  const [showFence, setShowFence] = useState<boolean>(false);

  const { data: routeData, isFetching, isFetched } = useGetRoute(deviceId);
  const { devices } = useDevicesPooling();

  useEffect(() => {
    if (devices?.length && !deviceId) {
      setDeviceId(devices[0]?.imei);
    }
  }, [devices]);

  useEffect(() => {
    if (routeData?.data) {
      setRoute(() =>
        routeData?.data?.map((item) => {
          return [item.lat, item.long];
        })
      );
    }
  }, [routeData]);

  const selectDevice = (id: string) => {
    if (id !== deviceId) {
      setDeviceId(id);
      setRoute([]);
      localStorage.setItem("selectedDeviceId", id);
    }
  };

  const handleVariantChange = () => {
    setShowRoute((prev) => {
      if (prev) {
        localStorage.removeItem("showRoute");
      } else {
        localStorage.setItem("showRoute", "true");
      }
      return !prev;
    });
  };

  const handleFenceDisplay = () => setShowFence((prev) => !prev);

  const routeDisplayData = showRoute ? route : route.slice(0, 1);

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: "100vh",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "50px",
          height: "99vh",
        },
      })}
    >
      <TopNav selectDevice={selectDevice} />
      <SideBanner
        deviceId={deviceId}
        data={routeData?.data[0]}
        showRoute={showRoute}
        handleVariantChange={handleVariantChange}
        handleFenceDisplay={handleFenceDisplay}
      />
      <div className="mapWrapper">
        {isFetching && !isFetched && <Loading />}
        {/* {!loading && !routeDisplayData?.length && (
          <Typography>No records yet received from the device!</Typography>
        )} */}
        {!!routeDisplayData?.length && (
          <HomeMap
            deviceId={deviceId}
            routeData={routeDisplayData}
            showFence={showFence}
          />
        )}
      </div>
      <div className="devicesCardWrapper">
        {devices?.map((item) => (
          <div
            key={item.id}
            className="devicesCard"
            onClick={() => selectDevice(item.imei)}
            style={{
              backgroundColor: deviceId === item.imei ? "#a5efbf" : "#fff",
            }}
          >
            <h3>Device: {item.name}</h3>
            <p>IMEI: {item.imei}</p>
            <p>Battery: {item.battery}%</p> <p>Signal: {item.signal}%</p>
            <p>Status: {item.status?.toUpperCase()}</p>
            {item?.analytics && (
              <>
                <p>Distance in 24h: {item?.analytics?.last24h}m</p>
                <p>Distance in last hour: {item?.analytics?.lastHour}m</p>
                <p>
                  Last kilometer made:{" "}
                  {item?.analytics?.lastKilometerReachedAt
                    ? getRelativeTime(
                        `${new Date(item?.analytics?.lastKilometerReachedAt)}`
                      )
                    : "--"}
                </p>
                <p>Version: {item.version}</p>
              </>
            )}
            {item.status !== "offline" && (
              <CommandCenter
                id={item.imei}
                value={
                  devices.find((device) => item.imei === device.imei)
                    ?.interval ?? "60"
                }
              />
            )}
            <div style={{ padding: "8px", marginTop: "6px" }}></div>
          </div>
        ))}
      </div>
      <NavDrawer deviceId={deviceId} center={route?.slice(0, 1)} />
    </Box>
  );
};

export default Home;
