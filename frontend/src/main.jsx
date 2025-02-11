import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import AppRoutes from "./routes/routes.jsx";
import { AuthWrapper } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthWrapper>
  </React.StrictMode>
);
