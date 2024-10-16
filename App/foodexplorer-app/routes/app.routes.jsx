import { Routes, Route } from "react-router-dom";

import Footer from "../src/components/Footer";
import Menu from "../src/pages/Menu";
import Home from "../src/pages/Home";
import DishDetails from "../src/pages/DishDetails";
import DishCreate from "../src/pages/DishCreate";
import DishEdit from "../src/pages/DishEdit";
import Favourites from "../src/pages/Favourites";
import MyOrder from "../src/pages/MyOrder";
import Payment from "../src/pages/Payment";

import { OrderProvider } from "../src/hooks/order";

export function AppRoutes() {
  return (
    <>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/dish/:id" element={<DishDetails />} />
          <Route path="/dish/edit/:id" element={<DishEdit />} />
          <Route path="/dish/new" element={<DishCreate />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </OrderProvider>
    </>
  );
}
