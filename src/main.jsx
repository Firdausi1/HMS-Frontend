import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { DepartmentProvider } from "./context/DepartmentContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          padding: 16,
          paddingLeft: 19,
          maxWidth: "100%",
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: "30px",
        },
        error: {
          duration: 7000,
          style: {
            background: "#333",
            color: "#fff",
          },
          // icon: <ErrorIcon />,
        },
        success: {
          duration: 7000,
          style: {
            background: "#333",
            color: "#fff",
          },
          // icon: <SuccessIcon />,
        },
        loading: {
          style: {
            backgroundColor: "#5935D5",
          },
        },
      }}
    />
    <AuthProvider>
      <DepartmentProvider>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </DepartmentProvider>
    </AuthProvider>
  </StrictMode>
);
