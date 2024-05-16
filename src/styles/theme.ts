"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#9C27B0",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    success: {
      main: "#1B5E20",
      light: "#1B5E20",
      dark: "#1B5E20",
    },
    error: {
      main: "#C62828",
      light: "#C62828",
      dark: "#C62828",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: 96,
      lineHeight: "112px",
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: "0.17px",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          height: 100%;
        }
        
        body {
          height: 100%;
          
          display: flex;
          justify-content: center;
        }`,
    },
    MuiAlert: {
      styleOverrides: {},
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          "&:hover": {
            background: "rgba(0, 0, 0, 0.04)",
          },
          "&:active": {
            background: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          width: 320,
          padding: "8px 22px",
        },
      },
    },
  },
});

export default theme;
