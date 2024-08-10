import React, { createContext, useState } from "react";
import all_product from "../All_Product/all_product";

const getCartItem = () => {
  let cart = {};
  for (let i = 1; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
export const ContextApi = createContext(null);
const ShopContext = (props) => {
  const [cartItms, setCartItms] = useState(getCartItem());
  console.log(cartItms);

  const addToCart = (itemId) => {
    setCartItms((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const Remove = (itemId) => {
    setCartItms((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const totalCartItems = () => {
    let total = 0;
    for (const cart in cartItms) {
      if (cartItms[cart] > 0) {
        total += cartItms[cart];
      }
    }
    return total;
  };
  const deleteCart = (itemId) => {
    setCartItms((prev) => ({ ...prev, [itemId]: 0 }));
  };
  const getTotalValue = () => {
    let totalAmount = 0;
    for (const item in cartItms) {
      if (cartItms[item] > 0) {
        let totalValue = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += totalValue.price * cartItms[item];
      }
    }
    return totalAmount;
  };
  const values = {
    cartItms,
    totalCartItems,
    setCartItms,
    addToCart,
    Remove,
    deleteCart,
    getTotalValue,
  };
  return (
    <ContextApi.Provider value={values}>{props.children}</ContextApi.Provider>
  );
};

export default ShopContext;
