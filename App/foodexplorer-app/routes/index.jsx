import { BrowserRouter } from "react-router-dom";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "../src/hooks/auth";

export default function Routes() {
  const { user } = useAuth();

  const isLoggedIn = user.id !== undefined
  // console.log(isLoggedIn)

  return (
    <BrowserRouter>
      {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}