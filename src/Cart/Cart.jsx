import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { FaArrowLeftLong, FaMinus, FaPlus } from "react-icons/fa6";
import Nav from "../Nav/Nav";
import { ContextApi } from "../ShopContext/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import img from "../assets/no-product.png";
import axios from "axios";
import swal from "sweetalert";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function Cart() {
  const Navigate = useNavigate();
  const [all_product, setProduct] = useState([]);
  const [loader, SetLoader] = useState(false);

  // State for delivery fee and vendor
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [uniqueVendor, setUniqueVendor] = useState(null);

  console.log(uniqueVendor);
  console.log(deliveryFee);

  const { cartItms, addToCart, Remove, deleteCart, getTotalValue } =
    useContext(ContextApi);

  const [packselect, setPack] = useState("none");
  const [price, setPrice] = useState(0);

  // Fetch all products
  const getAllProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(
        `https://msback.onrender.com/getalProducts`
      );
      if (response) {
        setProduct(response.data.response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoader(false);
    }
  };

  // Fetch delivery fee based on vendor
  const getDeliveryFee = async (vendor) => {
    try {
      const response = await axios.get("https://msback.onrender.com/AllPrice");
      const feeData = response.data.message;
      const filterFee = feeData.find((item) => item.vendor === vendor);
      if (filterFee) {
        setDeliveryFee(filterFee.DeliveryFee);
      } else {
        setDeliveryFee(0); // Default fee if not found
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // Compute cart products
  const cartProducts = all_product.filter((itm) => cartItms[itm.id] > 0);

  // Compute unique vendor whenever cartProducts change
  useEffect(() => {
    const vendors = cartProducts.map((product) => product.vendor);
    const uniqueVendors = [...new Set(vendors)];
    if (uniqueVendors.length === 1) {
      setUniqueVendor(uniqueVendors[0]);
      getDeliveryFee(uniqueVendors[0]);
    } else {
      setUniqueVendor(null);
      setDeliveryFee(0);
    }
  }, [cartProducts]);

  // Update price based on selected size
  const handleSelect = (e) => {
    const size = e.target.value;
    setPack(size);
    if (size === "Small") {
      setPrice(100);
    } else if (size === "Big") {
      setPrice(200);
    } else if (size === "none") {
      setPrice(0);
    }
  };

  // Calculate service fee
  const totalFee = getTotalValue() + Number(price);
  const serviceFee = (() => {
    if (totalFee <= 600) return 0.25 * totalFee;
    else if (totalFee <= 1000) return 0.15 * totalFee;
    else if (totalFee <= 2000) return totalFee * 0.1;
    return totalFee * 0.05;
  })();
  const total =
    (Number(deliveryFee) || 0) +
    (Math.floor(serviceFee) || 0) +
    (price || 0) +
    (Math.floor(getTotalValue()) || 0);

  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const CheckOut = () => {
    if (uniqueVendor) {
      // Proceed to the payment page if there is only one vendor
      Navigate("/Order_payment", {
        state: {
          receiptID: Date.now(),
          PackPrice: price,
          total: total,
          cartItem: cartProducts,
          serviceFee: serviceFee,
          deliveryFee: deliveryFee,
          vendor: uniqueVendor,
        },
      });
      console.log(deliveryFee);
      console.log(serviceFee);
    } else {
      // Show error message for multiple vendors
      swal({
        title: "Error!",
        text: "You have items from multiple vendors in your cart. Please checkout items from only one vendor at a time.",
        icon: "error",
        buttons: {
          confirm: {
            text: "Okay",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    }
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const modlalcontent =
    "please remember to add a pack if you're ordering an eatable food item . Also take a screenshot of your order confirmation page before checking out for future reference .Thank you!";
  return (
    <div>
      <Nav />
      <div className="pageBody">
        <div className="mt-3">
          <div className="orderbody">
            <div>
              Your Order <div className="YourOrder"></div>
            </div>
            <div>
              Checkout <div className="YourOrder2"></div>
            </div>
          </div>
          <div className="details">Order Summary</div>
          <div className="px-5 pt-3">
            <div>
              <button
                className="btn  continue py-2"
                onClick={() => {
                  window.history.back();
                }}
              >
                Continue Shopping
              </button>
              {/* <br />
              <select
                name="packSize"
                className="form-select w-50 mt-4"
                value={packselect}
                onChange={handleSelect}
              >
                <option value="none">None</option>
                <option value="Small">Small</option>
                <option value="Big">Big</option>
              </select> */}
            </div>
          </div>
        </div>
        {loader ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="cart-ItmBody">
            <div className="ordersummary">
              {cartProducts.length > 0 ? (
                cartProducts.map((itm) => (
                  <div key={itm.id} className="">
                    <div className="cartItms">
                      <div className="img d-flex">
                        <img src={itm.image} alt={itm.Pname} />
                        <div className="ms-3">
                          <div className="name">{itm.Pname}</div>
                          <div className="ms-1 totalPrice">
                            <TbCurrencyNaira />
                            {Math.floor(itm.price * cartItms[itm.id])}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="delete"
                          onClick={() => deleteCart(itm.id)}
                        >
                          <FiTrash2 color="red" />
                        </div>
                        <div className="counter-container2">
                          <div onClick={() => addToCart(itm.id)}>
                            <FaPlus size={10} />
                          </div>
                          <div className="counter2">{cartItms[itm.id]}</div>
                          <div onClick={() => Remove(itm.id)}>
                            <FaMinus size={10} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products text-center mt-5">
                  <img src={img} alt="" width={150} />
                  <br />
                  No products found in your cart.
                </div>
              )}
            </div>
            <div className="recipt">
              <p className="text-uppercase">
                thank you for choosing mealsection
              </p>
              <div>Receipt ID: {Date.now()}</div>
              <div className="my-4">Date: {date}</div>
              <hr />
              <div className="">
                Item Total: <TbCurrencyNaira />
                {Math.floor(getTotalValue())}
              </div>
              <hr />
              <div className="delivery-fee">
                Delivery Fee: <TbCurrencyNaira />
                {deliveryFee}
              </div>
              <hr />

              <div className="delivery-fee">
                Service Fee: <TbCurrencyNaira />
                {Math.floor(serviceFee)}
              </div>
              <hr />
              <div className="sub-total">
                Sub Total: <TbCurrencyNaira />
                {total}
              </div>
              <button className="checkout" onClick={CheckOut}>
                {deliveryFee ? (
                  "CheckOut"
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Modal */}
      <div className={modalIsOpen ? "modal-body-Active" : "modal-body"}>
        <div className="modal-container shadow">
          <div className="d-flex align-items-center justify-content-between">
            <div className="modal-header">Note!!</div>
            <div
              className="back"
              onClick={() => {
                setModalIsOpen(false);
                localStorage.clear("modalShown");
              }}
            >
              <IoMdClose size={24} />
            </div>
          </div>
          <hr />
          {loader ? (
            <div className="text-center mt-4">
              <div className="spinner-border spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="modal-content">{modlalcontent}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
