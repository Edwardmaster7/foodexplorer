import { Routes, Route } from "react-router-dom";

import Footer from "../src/components/Footer";
import Menu from "../src/pages/Menu";
import Home from "../src/pages/Home";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
      <Footer />
    </>
  );
}
