import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: [
        "Futura Now",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  })
);

export default theme;
