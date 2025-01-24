import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import {
  DepartmentProvider,
} from "./context/DepartmentContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DepartmentProvider>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </DepartmentProvider>
    </AuthProvider>
  </StrictMode>
);
