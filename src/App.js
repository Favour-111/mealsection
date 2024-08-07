import logo from "./logo.svg";
import "./App.css";
import Store from "./Store";
import { Route, Routes } from "react-router-dom";
import ProductStore from "./ProductStores/ProductStore";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/cafeteria" element={<ProductStore Store="Cafeteria" />} />
      </Routes>
    </>
  );
}

export default App;
