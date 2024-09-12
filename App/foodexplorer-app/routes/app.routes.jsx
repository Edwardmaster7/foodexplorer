import { Routes, Route } from "react-router-dom";

import Menu from "../src/pages/Menu";
// import SignUp from "../src/pages/SignUp";

export function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<SignIn />} /> */}
      <Route path="/" element={<Menu />} />
    </Routes>
  );
}