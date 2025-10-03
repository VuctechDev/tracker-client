import { Paper, Typography } from "@mui/material";

const DemoCard: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Paper
    sx={{
      flex: 1,
      p: { xs: 1, sm: 2.5 },
      display: "flex",
      flexDirection: "column",
      gap: 1,
    }}
  >
    <Typography variant="subtitle2" color="text.secondary" textAlign="center">
      {title}
    </Typography>
    {children}
  </Paper>
);

export default DemoCard;
