import logo from "./logo.svg";
import "./App.css";
import Store from "./Store";
import { Route, Routes } from "react-router-dom";
import ProductStore from "./ProductStores/ProductStore";
import ShopContext from "./ShopContext/ShopContext";
import Cart from "./Cart/Cart";
function App() {
  return (
    <>
      <ShopContext>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route
            path="/cafeteria"
            element={<ProductStore Store="Cafeteria" />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </ShopContext>
    </>
  );
}

export default App;
