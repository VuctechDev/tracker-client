import type { DeviceType } from "../queries/devices";

export const getInitialDeviceData = (devices: DeviceType[]) => {
  let id = "";
  let device: DeviceType | undefined = undefined;

  if (!devices?.length) {
    return {
      device,
      id,
    };
  }

  const params = new URLSearchParams(window.location.search);
  const idFromURL = params.get("deviceId");
  const storedDeviceId = localStorage.getItem("selectedDeviceId");

  if (idFromURL) {
    id = idFromURL;
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  } else if (storedDeviceId) {
    id = storedDeviceId;
  }

  device = devices?.find((d) => d.imei === id);

  if (!device) {
    id = devices[0].imei;
    device = devices[0];
  }

  localStorage.setItem("selectedDeviceId", id);
  return {
    device,
    id,
  };
};
