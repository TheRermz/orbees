import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { AppRoutes } from "./routes/AppRoutes.tsx";
import { ColorPickerGlobalStyle } from "./components/ui/ColorPicker/ColorPicker.styles.ts";
import { GlobalStyle } from "./styles/GlobalStyle.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <ColorPickerGlobalStyle />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </StrictMode>
);
