import { CircularProgress, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
      // position="fixed"
      // top={0}
      // left={0}
    >
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        {t("loading")}
      </Typography>
    </Box>
  );
}
