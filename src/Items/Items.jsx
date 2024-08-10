import React, { useContext, useRef, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { FaNairaSign } from "react-icons/fa6";
import { ContextApi } from "../ShopContext/ShopContext";
import "./Items.css";

const Items = (props) => {
  const { addToCart, cartItms, Remove } = useContext(ContextApi);
  const { title, price, image, id, category } = props;

  // State to store selected product details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // State to show success message
  const open = useRef();

  const Opencart = (product) => {
    setSelectedProduct(product); // Set the selected product details
    open.current.classList.toggle("overlaydisplay");
    setShowSuccess(false); // Reset the success message when opening the cart
  };

  const closeCart = () => {
    open.current.classList.remove("overlaydisplay");
    setSelectedProduct(null); // Clear the selected product details
  };

  const cartAdded = () => {
    setShowSuccess(true); // Show the success message
    setTimeout(() => {
      closeCart();
      setShowSuccess(false); // Hide the success message after 2 seconds
    }, 500);
  };

  return (
    <>
      <div className="overlay" ref={open}>
        <div
          className="cancelBody"
          onClick={() => {
            closeCart();
          }}
        >
          <IoClose className="cancel mb-2" />
        </div>
        {selectedProduct && (
          <>
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div className="name">{selectedProduct.title}</div>
            <div className="category">{selectedProduct.category}</div>
            <div className="price">
              <FaNairaSign />
              {selectedProduct.price}
            </div>
            <div className="bottom">
              <div className="quantityBox">
                <button
                  onClick={() => {
                    addToCart(id);
                  }}
                >
                  +
                </button>
                <div>{cartItms[id]}</div>
                <button
                  onClick={() => {
                    Remove(id);
                  }}
                >
                  -
                </button>
              </div>
              <div
                className="total mx-3"
                onClick={() => {
                  cartAdded();
                }}
              >
                Add {selectedProduct.price * cartItms[id]}
              </div>
            </div>
            {showSuccess && (
              <div className="successMessage">
                Successfully added {title} to cart!
              </div>
            )}
          </>
        )}
      </div>

      <div className="List" key={id}>
        <div>
          <img src={image} alt="" className="product_img" />
        </div>
        <div className="com">
          <div>
            <div className="name">{title.slice(0, 30)}......</div>
            <div className="category">{category}</div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="price d-flex align-items-center mt-1">
                <FaNairaSign />
                {price}
              </div>
            </div>
          </div>
          {cartItms[id] > 0 ? (
            <button className="incart">item in cart</button>
          ) : (
            <button
              className="addCart"
              onClick={() => {
                Opencart({ title, price, image, category }); // Pass product details to Opencart
              }}
            >
              <IoAdd />
              add
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Items;
