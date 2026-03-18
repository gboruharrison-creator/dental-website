import "./i18n/index.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </HelmetProvider>
  </StrictMode>
);