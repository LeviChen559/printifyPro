import { createTheme } from "@mui/material/styles";
import { Lato } from "next/font/google";
import { Roboto_Slab,Kanit } from "next/font/google";

export interface iFont {
  weight: string[];
  style: string[];
  subsets: string[];
}
export const lato = Lato({
  weight: ["300", "400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
export const roboto_slab = Roboto_Slab({ weight: "400", subsets: ["latin"] });
export const kanit = Kanit({ weight: ["300", "400", "700"],subsets: ["latin", "vietnamese"]  });
import "@mui/material";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    sl: true;
    ml: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}
declare module "@mui/material/styles" {
  interface TypeText {
    thirdary: string;
  }
}
export interface ColorTheme {
  [key: string]: {
      // This defines the index signature
      main: string;
  };
}
export const colorTheme: ColorTheme = {
  admin: {
      main: "#f6edff",
  },
  user: {
      main: "#fcece3",
  },
}

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#4BA4CB",
      light: "#ffffff",
      dark: "#F3E5DA",
    },
    secondary: {
      main: "#F3E5DA",
      light: "#ffffff",
      dark: "#BADAFF",
    },
    
    text: {
      primary: "#424242",
      secondary: "#808080",
      thirdary: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 351,
      sm: 451,
      sl: 601,
      md: 769,
      ml: 961,
      lg: 1201,
      xl: 1537,
      xxl: 1920,
    },
  },
  typography: {
    h1: {
      fontSize: 48,
      fontWeight: 700,
      fontFamily: lato.style.fontFamily,
      letterSpacing: 0,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 28,
      },
      "@media (max-width:450px)": {
        fontSize: 26,
      },
      "@media (max-width:350px)": {
        fontSize: 24,
      },
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 24,
      },
      "@media (max-width:600px)": {
        fontSize: 22,
      },
      "@media (max-width:450px)": {
        fontSize: 20,
      },
      "@media (max-width:350px)": {
        fontSize: 18,
      },
    },
    h3: {
      fontSize: 32,
      fontFamily: lato.style.fontFamily,
      letterSpacing: 0,
      WebkitFontSmoothing: "antialiased",
      fontWeight: 700,
      "@media (max-width:768px)": {
        fontSize: 22,
      },
    },

    h4: {
      fontSize: 26,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      fontWeight: 700,
      "@media (max-width:768px)": {
        fontSize: 20,
      },
    },
    h5: {
      fontFamily: lato.style.fontFamily,
      fontSize: 22,
      lineHeight: 1.25,
      letterSpacing: 0,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 18,
      },
    },
    h6: {
      fontSize: 16,
      fontFamily: lato.style.fontFamily,
      lineHeight: 1.25,
      letterSpacing: 0,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 16,
      },
    },
    subtitle1: {
      fontSize: 28,
      lineHeight: 1.25,
      marginBottom: 18,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 20,
        marginBottom: 12,
      },
    },
    subtitle2: {
      fontSize: 18,
      lineHeight: 1.25,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 16,
      },
      "@media (max-width:450px)": {
        fontSize: 14,
      },
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.25,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 16,
      },
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.25,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        marginTop: 0,
        fontSize: 14,
      },
      "@media (max-width:350px)": {
        marginTop: 0,
        fontSize: 12,
      },
    },
    caption: {
      fontSize: 12,
      lineHeight: 1,
      letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
    },
    button: {
      fontSize: 20,
      fontWeight: 700,
      // letterSpacing: 0,
      fontFamily: lato.style.fontFamily,
      WebkitFontSmoothing: "antialiased",
      "@media (max-width:768px)": {
        fontSize: 18,
      },
      "@media (max-width:450px)": {
        fontSize: 16,
      },
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: 0,
            paddingLeft: 10,
            color:"#000000"
          },
          "& .MuiInputLabel": {
            color: "#000000",
            fontWeight: "bold",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            color: "#000000", // Label color
            // fontWeight: "bold", // Bold label text
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#000000", // Label color
          // fontWeight: "bold", // Bold label text
        },
      },
    },
  },
});

export default globalTheme;
