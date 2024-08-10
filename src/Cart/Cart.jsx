import React, { useContext } from "react";
import "./Cart.css";
import { FaArrowLeftLong, FaMinus, FaPlus } from "react-icons/fa6";
import Nav from "../Nav/Nav";
import { ContextApi } from "../ShopContext/ShopContext";
import { FiDelete, FiTrash, FiTrash2 } from "react-icons/fi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import all_product from "../All_Product/all_product";
function Cart() {
  const { cartItms, addToCart, Remove, deleteCart, getTotalValue } =
    useContext(ContextApi);

  return (
    <div>
      <Nav />
      <div>
        <div
          className="badger mb-3 px-3"
          onClick={() => {
            window.history.back();
          }}
        >
          <FaArrowLeftLong /> <div>Checkout</div>
        </div>
        <div className="orderbody">
          <div>
            Your Order <div className="YourOrder"></div>
          </div>
          <div>
            Checkout <div className="YourOrder2"></div>
          </div>
        </div>
        <div className="details">order summary</div>
        <div className="d-flex align-items-center gap-3 px-5 pt-3 justify-content-center">
          <div className="total">total:{Math.floor(getTotalValue())}</div>
          <div>
            <button
              className="btn btn-primary continue"
              onClick={() => {
                window.history.back();
              }}
            >
              continue shopping
            </button>
          </div>
        </div>
      </div>
      <div className="ordersummary">
        {all_product.map((itm) => {
          if (cartItms[itm.id] > 0) {
            return (
              <div className="p-3">
                <div className="cartItms">
                  <div className="img d-flex">
                    <img src={itm.image} alt="" />
                    <div className="ms-3">
                      <div className="name">{itm.title}</div>
                      <div
                        className="delete"
                        onClick={() => {
                          deleteCart(itm.id);
                        }}
                      >
                        {" "}
                        <FiTrash2 /> Delete
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="counter-container2">
                      <div
                        onClick={() => {
                          addToCart(itm.id);
                        }}
                      >
                        <FaPlus size={10} />
                      </div>
                      <div className="counter2">{cartItms[itm.id]}</div>
                      <div
                        onClick={() => {
                          Remove(itm.id);
                        }}
                      >
                        <FaMinus size={10} />
                      </div>
                    </div>
                  </div>
                  <div className="ms-4">
                    {Math.floor(itm.price * cartItms[itm.id])}
                  </div>
                </div>
                <hr className="mt-4" />
              </div>
            );
          } else {
            <>no product found</>;
          }
        })}
      </div>
    </div>
  );
}

export default Cart;
