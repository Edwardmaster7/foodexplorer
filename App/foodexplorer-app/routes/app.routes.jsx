import { Routes, Route } from "react-router-dom";

import Footer from "../src/components/Footer";
import Menu from "../src/pages/Menu";
import Home from "../src/pages/Home";
import DishDetails from "../src/pages/DishDetails";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}
