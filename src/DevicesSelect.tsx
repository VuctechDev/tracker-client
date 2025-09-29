import { Select, MenuItem, Box } from "@mui/material";
import { useDevicesPooling, type DeviceType } from "./queries/devices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  selectedDevice?: DeviceType;
  onSelect: (imei: string) => void;
}

const DevicesSelect: React.FC<Props> = ({ selectedDevice, onSelect }) => {
  const { devices } = useDevicesPooling();
  const onlineDevices = devices.filter((d) => d?.status !== "offline");
  const offlineDevices = devices.filter((d) => d?.status === "offline");
  const sortedDevices = [...onlineDevices, ...offlineDevices];

  return (
    <Box
      sx={{
        minWidth: "200px",
      }}
    >
      <Select
        key={selectedDevice?.imei}
        value={selectedDevice?.imei}
        IconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ fontSize: "14px", fontWeight: 700 }}
          />
        )}
        onChange={(e) => {
          const id = e.target.value ?? "";
          onSelect(id);
        }}
        sx={{
          fontWeight: 700,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: "280px",
              overflowY: "auto",
            },
          },
        }}
      >
        {sortedDevices.map((device) => (
          <MenuItem
            key={device?.imei}
            value={device?.imei}
            sx={{
              fontWeight: 600,
              display: "flex",
              minHeight: "36px !important", // override MUI's default minHeight (48px)
              height: "36px !important",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor:
                    device?.status !== "offline" ? "#4caf50" : "#f44336",
                  mr: "4px",
                }}
              />
              {device?.name}
              {/* <Typography fontWeight={700}> </Typography> */}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default DevicesSelect;
