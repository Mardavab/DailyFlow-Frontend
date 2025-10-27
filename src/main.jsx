import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Styles.css";
import {App} from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthProvider.jsx";
import 'startbootstrap-sb-admin-2/css/sb-admin-2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
