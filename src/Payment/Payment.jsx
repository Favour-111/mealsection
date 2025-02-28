import React, { useContext, useState, useEffect } from "react";
import "./Payment.css";
import background from "../assets/WhatsApp Image 2024-08-24 at 20.18.12_988ce6f9.jpg";
import hourglass from "../assets/hourglass.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiPhone, CiUser } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaIdCard,
  FaMoneyBill,
  FaPaperPlane,
  FaRegCopy,
  FaStore,
} from "react-icons/fa";
import { LuUploadCloud } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { FiPackage } from "react-icons/fi";
import { ContextApi } from "../ShopContext/ShopContext";
import axios from "axios";
import swal from "sweetalert";
import { FaNoteSticky, FaPaperclip, FaWhatsapp } from "react-icons/fa6";
import { PaystackButton } from "react-paystack";
import formBlob from "../assets/login1.png";
import { useRef } from "react";

const Payment = () => {
  const { cartItms } = useContext(ContextApi);
  const location = useLocation();
  const {
    receiptID,
    total,
    cartItem,
    vendor,
    deliveryFee,
    serviceFee,
    checked,
  } = location.state || {};

  const navigate = useNavigate();
  // const [copied, setCopied] = useState(false);
  const textToCopy = "6413130454";
  const [loader, setLoader] = useState(false);
  const publickey = "pk_test_906a70561b64d6cbee516bc9258552ffce77f14a";
  // Form state with cart items and their quantities
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    WhatsApp: "",
    gender: "",
    totalPrice: total || "",
    Address: "",
    orderId: receiptID || "",
    Note: "",
    cartItems: cartItem, // Initialize with an empty array
    Vendor: vendor || "",
  });

  // Populate cart items with product names and quantities
  useEffect(() => {
    if (cartItem?.length > 0 && cartItms) {
      const updatedCartItems = cartItem.map((item) => ({
        category: item.category,
        productId: item.id,
        productName: item.Pname,
        quantity: cartItms[item.id] || 1, // Default quantity to 1 if undefined
        FoodPrice: Number(item.price) * cartItms[item.id] || 1,
      }));
      console.log(updatedCartItems);

      setForm((prevForm) => ({
        ...prevForm,
        cartItems: updatedCartItems,
      }));
    }
  }, [cartItem, cartItms]);

  // Handle form input change
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const handlePaymentSuccess = async (response) => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("WhatsApp", form.WhatsApp);
    formData.append("gender", form.gender);
    formData.append("totalPrice", form.totalPrice);
    formData.append("Address", form.Address);
    formData.append("orderId", form.orderId);
    formData.append("Note", form.Note);
    formData.append("cartItems", JSON.stringify(form.cartItems));
    formData.append("Vendor", form.Vendor);
    formData.append("email", form.email);

    try {
      setLoader(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/PostOrder",
          form,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Axios Error:", error.message);
      }

      console.log("Server Response:", response.data);
      console.log(form);

      if (response.status === 200) {
        navigate("/order", { state: { form, deliveryFee, serviceFee } }); // Pass the form state to the next page
      } else {
        swal({
          title: "Error!",
          text: "Network Error, try again.",
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
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  // Paystack configuration
  const paystackConfig = {
    email: form.email,
    amount: total * 100, // Convert to Kobo
    publicKey: publickey,
    reference: `MS_${new Date().getTime()}`, // Generate unique reference
    currency: "NGN",
    metadata: {
      name: form.name,
      phoneNumber: form.phoneNumber,
    },
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => alert("Are you sure you want to close?"),
  };

  // Handle copy to clipboard
  // const handleCopy = () => {
  //   if (navigator.clipboard && window.isSecureContext) {
  //     navigator.clipboard.writeText(textToCopy).then(() => {
  //       setCopied(true);
  //       toast.success("Copied to clipboard!");
  //       setTimeout(() => setCopied(false), 2000);
  //     });
  //   } else {
  //     const textArea = document.createElement("textarea");
  //     textArea.value = textToCopy;
  //     document.body.appendChild(textArea);
  //     textArea.select();
  //     try {
  //       document.execCommand("copy");
  //       setCopied(true);
  //       toast.success("Copied to clipboard!");
  //     } catch (err) {
  //       console.error("Failed to copy: ", err);
  //       toast.error("Failed to copy text.");
  //     }
  //     document.body.removeChild(textArea);
  //     setTimeout(() => setCopied(false), 2000);
  //   }
  // };

  // const handlePaymentSuccess = async (response) => {
  //   try {
  //     setLoader(true);

  //     const formData = new FormData();
  //     formData.append("name", form.name);
  //     formData.append("phoneNumber", form.phoneNumber);
  //     formData.append("WhatsApp", form.WhatsApp);
  //     formData.append("gender", form.gender);
  //     formData.append("totalPrice", form.totalPrice);
  //     formData.append("Address", form.Address);
  //     formData.append("orderId", form.orderId);
  //     formData.append("Note", form.Note);
  //     formData.append("cartItems", JSON.stringify(form.cartItems));
  //     formData.append("Vendor", form.Vendor);

  //     const response = await axios.post(
  //       "https://msback.onrender.com/PostOrder",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if (response.status === 200) {
  //       navigate("/order", { state: { form, deliveryFee, serviceFee } });
  //     } else {
  //       swal({
  //         title: "Error!",
  //         text: "Network Error, try again.",
  //         icon: "error",
  //         buttons: {
  //           confirm: {
  //             text: "Okay",
  //             value: true,
  //             visible: true,
  //             className: "btn btn-danger",
  //             closeModal: true,
  //           },
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //     swal({
  //       title: "Error!",
  //       text: "Something went wrong. Try again.",
  //       icon: "error",
  //       buttons: {
  //         confirm: {
  //           text: "Okay",
  //           value: true,
  //           visible: true,
  //           className: "btn btn-danger",
  //           closeModal: true,
  //         },
  //       },
  //     });
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  return (
    <div>
      <div className="header">
        <div className="back m-3" onClick={() => window.history.back()}>
          <MdKeyboardArrowLeft size={30} />
        </div>

        <div className="bread-crumbs">
          <div className="bread-crumbs-container">
            <div className="Bread-crumbs-Header">Checkout</div>
            <div className="d-flex gap-1 breadCrumb-content">
              <div
                onClick={() => navigate("/home")}
                style={{
                  cursor: "pointer",
                }}
              >
                Home
              </div>
              <div>
                <img
                  width="10"
                  height="10"
                  src="https://img.icons8.com/ios-glyphs/30/forward.png"
                  alt="forward"
                />
              </div>
              <span>checkout</span>
            </div>
          </div>
        </div>

        <div className="form-container2">
          <div>
            <img src={formBlob} alt="" className="form-blob" />
          </div>
          <div className="mt-5">
            <div className="form-body">
              <div className="headercontact">Contact Information</div>
              <div className="headercontact2 mb-1">
                input all contact information
              </div>
              <div className="instruction">
                Please ensure that all fields are filled out before proceeding.
                Every input is required to complete this form successfully
              </div>
              <div className="review-form shadow p-4">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row w-100">
                    <div className="review-form-item col-md-6 col-sm-12">
                      <label htmlFor="name">Your Name</label>

                      <input type="text" onChange={handleInput} name="name" />
                    </div>
                    <div className="review-form-item col-md-6 col-sm-12">
                      <label htmlFor="phone">Phone number</label>

                      <input
                        type="text"
                        onChange={handleInput}
                        name="phoneNumber"
                      />
                    </div>
                  </div>
                  <div className="review-form-item ">
                    <label htmlFor="phone">Email</label>

                    <input type="email" onChange={handleInput} name="email" />
                  </div>

                  <div className="row w-100">
                    <div className="review-form-item col-md-6 col-sm-12">
                      <label htmlFor="phone">Note</label>

                      <input
                        type="text"
                        onChange={handleInput}
                        placeholder="(Optional)"
                        name="Note"
                      />
                    </div>

                    <div className="review-form-item col-md-6 col-sm-12">
                      <label htmlFor="phone">WhatsApp</label>

                      <input
                        type="text"
                        onChange={handleInput}
                        name="WhatsApp"
                      />
                    </div>
                  </div>

                  <div className="review-form-item">
                    <label htmlFor="gender">Gender</label>
                    <br />
                    <select onChange={handleInput} name="gender">
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  {checked === true ? null : (
                    <div className="review-form-item">
                      <label htmlFor="location">Location</label>
                      <textarea
                        onChange={handleInput}
                        name="Address"
                        className="p-2 mt-1"
                      ></textarea>
                    </div>
                  )}
                  <PaystackButton
                    className="review-button"
                    {...paystackConfig}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payment;
