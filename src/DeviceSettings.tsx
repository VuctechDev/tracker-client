import { useState, useEffect, type ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { getRelativeTime } from "./utils/getDisplayDate";
import {
  useDevicesPooling,
  useUpdateDeviceName,
  type DeviceType,
} from "./queries/devices";
import { useNavigate } from "react-router-dom";
import type { LatLngExpression } from "leaflet";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  deviceId: string;
  center?: LatLngExpression[];
}

const DeviceSettings: React.FC<Props> = ({ deviceId, center }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { devices } = useDevicesPooling();
  const [open, setOpen] = useState<boolean>(false);
  const [previewInterval, setPreviewInterval] = useState<string>(
    localStorage.getItem("routePreviewInterval") ?? "3"
  );
  const [changedName, setChangedName] = useState<string>("");

  const { mutateAsync, isPending } = useUpdateDeviceName();

  const handlePreviewChange = async (e: SelectChangeEvent) => {
    const v = e.target.value as string;
    setPreviewInterval(v);
    localStorage.setItem("routePreviewInterval", v);
    await queryClient.invalidateQueries({ queryKey: ["route", deviceId] });
  };

  const device = devices.find((d) => d.imei === deviceId) ?? ({} as DeviceType);

  const handleDialog = () => setOpen((prev) => !prev);

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const v = e.target.value as string;
    setChangedName(v);
  };

  const handleUpdate = async () => {
    try {
      await mutateAsync({ name: changedName, id: device?.id });
      handleDialog();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (device?.name) {
      setChangedName(device?.name);
    }
  }, [device]);

  const disabled = changedName === device?.name || !changedName || isPending;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        px: "18px",
        pt: "4px",
        pb: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>
          <span style={{ fontWeight: 600 }}>{t("imei")}:</span> {deviceId}
        </Typography>

        <FontAwesomeIcon
          onClick={handleDialog}
          style={{ fontSize: "20px", fontWeight: 400 }}
          icon={faPenToSquare}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          my: "auto",
          pt: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={() =>
            navigate("/geofence", {
              state: { deviceId, center },
              replace: true,
            })
          }
        >
          {t("geofence")}
        </Button>

        <FormControl sx={{ width: { xs: 150, sm: 150 } }}>
          <InputLabel id="preview-label">{t("preview")}</InputLabel>
          <Select
            labelId="preview-label"
            id="preview"
            value={previewInterval}
            label={t("preview")}
            onChange={handlePreviewChange}
            MenuProps={{ MenuListProps: { dense: true } }}
          >
            <MenuItem value="1">{t("lastNDays", { count: 1 })}</MenuItem>
            <MenuItem value="3">{t("lastNDays", { count: 3 })}</MenuItem>
            <MenuItem value="7">{t("lastNDays", { count: 7 })}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "auto",
        }}
      >
        <Typography variant="body2">
          <span style={{ fontWeight: 600 }}>{t("version")}:</span>{" "}
          {device?.version}
        </Typography>
        <Typography variant="body2">
          <span style={{ fontWeight: 600 }}>{t("lastUpdate")}:</span>{" "}
          {getRelativeTime(device?.updatedAt ?? "")}
        </Typography>
      </Box>
      {open && (
        <Dialog open={open} onClose={handleDialog}>
          <Box
            sx={{
              width: "80vw",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              p: "20px",
              backgroundColor: "#fff",
              rowGap: "28px",
            }}
          >
            <TextField
              fullWidth
              value={changedName}
              onChange={handleNameChange}
            />
            <Button
              disabled={disabled}
              fullWidth
              variant="contained"
              onClick={handleUpdate}
            >
              {t("save")}
            </Button>
          </Box>
        </Dialog>
      )}
    </Box>
  );
};

export default DeviceSettings;
