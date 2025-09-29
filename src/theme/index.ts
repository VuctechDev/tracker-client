import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// const theme = createTheme({
//   typography: {
//     // fontFamily: `'Inter', sans-serif`,
//     fontFamily: `"Noto Sans", sans-serif`,
//     body1: {
//       margin: 0,
//       fontSize: "14px",
//       fontWeight: 500,
//     },
//     body2: {
//       margin: 0,
//       fontSize: "10px",
//       fontWeight: 600,
//     },
//     h6: {
//       margin: 0,
//       fontSize: "16px",
//       fontWeight: 600,
//     },
//   },
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//     background: {
//       default: "#f4f4f4",
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiButton: {
//       defaultProps: {
//         disableElevation: true,
//       },
//     },
//   },
// });

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
    fontFamily: `"Noto Sans", sans-serif`,
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
    body1: {
      margin: 0,
      fontSize: "13px",
      fontWeight: 500,
    },
    body2: {
      margin: 0,
      fontSize: "10px",
      fontWeight: 600,
    },
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

export default theme;
