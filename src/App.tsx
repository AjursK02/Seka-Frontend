import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { CareProvider } from "./context/CareContext";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CareProvider>
          <AppRoutes />
        </CareProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
