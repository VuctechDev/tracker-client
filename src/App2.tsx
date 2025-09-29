import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"; // MUI v5 Grid v2
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { grey } from "@mui/material/colors";

// ---- THEME ----
let base = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff", // clean white canvas
      paper: "#ffffff",
    },
    primary: {
      main: "#1f2937", // slate-ish for titles & accents
      contrastText: "#ffffff",
    },
    secondary: {
      main: grey[700],
    },
    text: {
      primary: "#111827", // near-black
      secondary: grey[700],
    },
    divider: grey[200],
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
        },
        "*": { scrollbarColor: `${grey[400]} ${grey[100]}` },
        "*::-webkit-scrollbar": { height: 8, width: 8 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: grey[400],
          borderRadius: 999,
        },
        "*::-webkit-scrollbar-track": { backgroundColor: grey[100] },
      },
    },
    // Subtly darkened/elegant cards
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: grey[50], // a whisper of grey
          border: `1px solid ${grey[200]}`,
          boxShadow: "0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03)",
        },
      },
    },
    // Light grayish, tasteful buttons
    MuiButton: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          paddingInline: theme.spacing(1.5),
          [theme.breakpoints.up("sm")]: {
            paddingInline: theme.spacing(2),
          },
        }),
        contained: {
          backgroundColor: grey[200],
          color: "#111827",
          boxShadow: "0 1px 1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.05)",
          "&:hover": {
            backgroundColor: grey[300],
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.08)",
          },
          "&:active": { backgroundColor: grey[400] },
        },
        outlined: {
          borderColor: grey[300],
          color: grey[800],
          "&:hover": { backgroundColor: grey[100] },
        },
        text: {
          color: grey[800],
          "&:hover": { backgroundColor: grey[100] },
        },
      },
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {
            backgroundColor: grey[900],
            color: "#fff",
            "&:hover": { backgroundColor: "#0b1220" },
          },
        },
      ],
    },
    // Inputs with a subtle frame
    MuiTextField: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: 12,
        },
      },
    },
    MuiFormControl: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiSelect: {
      defaultProps: { size: "small" },
      styleOverrides: { root: { fontSize: "14px" } },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: grey[200] } },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          borderColor: grey[300],
        },
      },
    },
  },
});

const theme = responsiveFontSizes(base);

// ---- DEMO APP ----
const DemoCard: React.FC<{ title: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Paper
    sx={{
      p: { xs: 2, sm: 2.5 },
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Typography variant="subtitle2" color="text.secondary">
      {title}
    </Typography>
    {children}
  </Paper>
);

const App: React.FC = () => {
  const [status, setStatus] = React.useState<string>("all");
  const handleStatus = (e: SelectChangeEvent) =>
    setStatus(e.target.value as string);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: "saturate(180%) blur(6px)",
          borderBottom: `1px solid ${grey[200]}`,
        }}
      >
        <Toolbar sx={{ gap: 1, py: { xs: 0.5, sm: 1 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Backoffice
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" spacing={1}>
            <Chip label="Staging" size="small" />
            <Button variant="contained">New Entry</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography color="text.secondary">
              A clean, elegant base you can extend for your admin.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <DemoCard title="Quick Actions">
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" color="primary">
                    Create
                  </Button>
                  <Button variant="outlined">Export</Button>
                  <Button variant="text">Share</Button>
                </Stack>
              </DemoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <DemoCard title="Search">
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <FormControl sx={{ width: { xs: "100%", sm: 180 } }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      id="status"
                      value={status}
                      label="Status"
                      onChange={handleStatus}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField fullWidth placeholder="Search records..." />
                  <Button variant="contained">Find</Button>
                </Stack>
              </DemoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DemoCard title="Overview">
                <Typography>
                  Use this card to show KPIs or a table. The card background is
                  a very light grey for elegance.
                </Typography>
              </DemoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DemoCard title="Recent Activity">
                <Stack divider={<Divider />} spacing={1.25}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        py: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: grey[400],
                        }}
                      />
                      <Typography variant="body2">
                        Item #{i + 1} processed
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </DemoCard>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default App;
