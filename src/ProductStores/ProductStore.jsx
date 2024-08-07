import React from "react";
import "./ProductStore.css";
import Nav from "../Nav/Nav";
import { IoBag } from "react-icons/io5";
import all_product from "../All_Product/all_product";
import { FiShoppingBag } from "react-icons/fi";
import Items from "../Items/Items";
import Footer from "../footer/Footer";
const ProductStore = () => {
  return (
    <div>
      <Nav />
      <div className="body">
        <div className="badger my-3">
          <div>
            home <span className="mx-2">/</span>{" "}
            <span className="mx-2">store</span>
            <span className="mx-2">/</span>cafeteria
          </div>
          <div className="counter-cont">
            <div className="counter">0</div>
            <FiShoppingBag />
          </div>
        </div>
        <div className="breaddcrumb">Cafetaria</div>
        <div className="Drinks_List">
          <div className="mt-4 text-capitalize">
            <span className="mx-2 text-success">0</span>product found
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
          <div className="Logo mt-5 ms-5">Proteins</div>
          <div className=" list">
            {all_product.map((items) => {
              if (items.category === "jewelery") {
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
          <div className="Logo mt-5 ms-5">others</div>
          <div className=" list">
            {all_product.map((items) => {
              if (items.category === "electronics") {
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
