import { BrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../src/hooks/auth";

export default function Routes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user.id ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}