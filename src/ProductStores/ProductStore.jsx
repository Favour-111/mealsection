import React from "react";
import "./ProductStore.css";
import Nav from "../Nav/Nav";
import { IoBag } from "react-icons/io5";
import all_product from "../All_Product/all_product";
import { FiShoppingBag } from "react-icons/fi";
import Items from "../Items/Items";
import Footer from "../footer/Footer";
import { FaArrowLeftLong } from "react-icons/fa6";
const ProductStore = () => {
  return (
    <div>
      <Nav />
      <div className="body">
        <div
          className="badger"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeftLong /> <div>Cafetaria</div>
        </div>
        <div className="breaddcrumb">Cafetaria</div>
        <div className="Drinks_List">
          <div className="mt-4 text-capitalize">
            <span className="mx-2 text-success">0</span>product found
          </div>
          <div className="ProductType">
            <div>others</div>
            <div>Proteins</div>
            <div>Drinks</div>
          </div>
          <div className="Logo mt-5 ms-5">Drinks</div>
          <div className=" list">
            {all_product.map((items) => {
              if (items.category === "men's clothing") {
                return (
                  <Items
                    title={items.title}
                    image={items.image}
                    price={items.price}
                    category={items.category}
                    id={items.id}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStore;
