"use client";

import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  palette: {
    primary: {
      light: pink[100],
      main: pink[500],
      dark: pink[700],
      contrastText: pink[900],
    },
  },
});

export default theme;
