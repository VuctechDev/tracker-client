import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Popover,
} from "@mui/material";
import type { DeviceType } from "./App";

interface Props {
  devices: DeviceType[];
  onSelect: (imei: string) => void;
}

const DevicesSelect: React.FC<Props> = ({ devices, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box className="mobileNavVevices" onClick={handleClick}>
        <Typography variant="body1">Uredjaji: {devices?.length}</Typography>{" "}
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{ marginTop: "4px" }}
      >
        <Box sx={{ p: 1, minWidth: 200 }}>
          <List sx={{ paddingY: 0 }}>
            {devices.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  onSelect(item.imei);
                  handleClose();
                }}
                sx={{
                  paddingY: "3px",
                  borderBottom:
                    index !== devices.length - 1 ? "1px solid lightgray" : "",
                }}
              >
                <ListItemText primary={item.name} />
                <BatteryLevel level={item.battery} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

interface BatteryLevelProps {
  level: number;
}

const getColor = (index: number, activeSegments: number): string => {
  if (index >= activeSegments) return "transparent";
  if (activeSegments >= 5) return "#4caf50"; // green
  if (activeSegments >= 3) return "#ffeb3b"; // yellow
  return "#f44336"; // red
};

function BatteryLevel({ level }: BatteryLevelProps) {
  const clamped = Math.max(0, Math.min(level, 100));
  const activeSegments = Math.round((clamped / 100) * 6);

  return (
    <Box display="flex" alignItems="center">
      <Box
        sx={{
          width: 32,
          height: 16,
          border: "1px solid #333",
          borderRadius: "2px",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              backgroundColor: getColor(i, activeSegments),
              marginRight: i < 5 ? "1px" : 0,
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          width: 4,
          height: 7,
          backgroundColor: "#333",
          ml: "0px",
          borderRadius: "2px",
        }}
      />
    </Box>
  );
}

export default DevicesSelect;
