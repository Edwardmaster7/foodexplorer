// main file (e.g., index.js or App.js)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/global";
import theme from "./styles/theme";
import Routes from "../routes";
import { AuthProvider } from "./hooks/auth";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <AuthProvider> {/* Wrap your application with AuthProvider */}
          <Routes />
        </AuthProvider> {/* Wrap your application with AuthProvider */}
      </>
    </ThemeProvider>
  </StrictMode>
);
