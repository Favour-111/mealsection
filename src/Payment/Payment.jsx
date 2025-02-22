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
const Payment = () => {
  const { cartItms } = useContext(ContextApi);
  const location = useLocation();
  const { receiptID, total, cartItem, vendor, deliveryFee, serviceFee } =
    location.state;
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const textToCopy = "6413130454";
  const [page, setPage] = useState("form");
  const [uploadPage, setUploadPage] = useState("uploadpg");
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setForm((prevForm) => ({ ...prevForm, image: file }));
  };

  // Form state with cart items and their quantities
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    WhatsApp: "",
    gender: "",
    totalPrice: total || "",
    Address: "",
    orderId: receiptID || "",
    Note: "",
    cartItems: cartItem, // Initialize with an empty array
    Vendor: vendor || "",
    image: image,
  });

  // Populate cart items with product names and quantities
  useEffect(() => {
    if (cartItem?.length > 0 && cartItms) {
      const updatedCartItems = cartItem.map((item) => ({
        productImage: item.image,
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

  // Handle copy to clipboard
  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        toast.success("Copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy text.");
      }
      document.body.removeChild(textArea);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please upload an image");
      return;
    }

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
    formData.append("image", form.image);

    try {
      setLoader(true);
      const response = await axios.post(
        "https://msback.onrender.com/PostOrder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
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

  const changePage = () => {
    if (
      form.name === "" ||
      form.phoneNumber === "" ||
      form.WhatsApp === "" ||
      form.gender === "" ||
      form.Address === ""
    ) {
      swal({
        title: "Error!",
        text: "inputs are required",
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
    } else if (isNaN(form.phoneNumber) || isNaN(form.WhatsApp)) {
      swal({
        title: "Error!",
        text: "inputs numbers in the phone number and whatApp number space",
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
    } else {
      setPage("uploadpg");
    }
  };

  return (
    <div>
      {uploadPage === "uploadpg" ? (
        <div className="header">
          <div className="back mt-3" onClick={() => window.history.back()}>
            <MdKeyboardArrowLeft size={30} />
          </div>
          <div className="logo p-4">
            <img src={background} alt="" width={170} />
          </div>
          <div className="breadcrumbs">
            home <MdKeyboardArrowRight /> cart <MdKeyboardArrowRight /> checkout{" "}
            <MdKeyboardArrowRight />
          </div>

          {page === "form" ? (
            <div className="form-container2">
              <div className="headercontact">Contact Information</div>
              <div className="form-body">
                <div className="review-form shadow p-4">
                  <form>
                    <div className="review-form-item">
                      <label htmlFor="name">Your Name</label>
                      <div className="d-flex align-items-center gap-2 form-input">
                        <CiUser size={20} />
                        <input
                          type="text"
                          onChange={handleInput}
                          placeholder="Input Name"
                          name="name"
                        />
                      </div>
                    </div>
                    <div className="review-form-item">
                      <label htmlFor="phone">Phone number</label>
                      <div className="d-flex align-items-center gap-2 form-input">
                        <CiPhone size={20} />
                        <input
                          type="text"
                          onChange={handleInput}
                          placeholder="Input Phone Number"
                          name="phoneNumber"
                        />
                      </div>
                    </div>
                    <div className="review-form-item">
                      <label htmlFor="phone">Note</label>
                      <div className="d-flex align-items-center gap-2 form-input">
                        <FaPaperclip size={20} />
                        <input
                          type="text"
                          onChange={handleInput}
                          placeholder="Input Note(Optional)"
                          name="Note"
                        />
                      </div>
                    </div>
                    <div className="review-form-item">
                      <label htmlFor="phone">WhatsApp</label>
                      <div className="d-flex align-items-center gap-2 form-input">
                        <FaWhatsapp size={20} />
                        <input
                          type="text"
                          onChange={handleInput}
                          placeholder="Input whatApp Number"
                          name="WhatsApp"
                        />
                      </div>
                    </div>
                    <div className="review-form-item">
                      <label htmlFor="gender">Gender</label>
                      <select
                        className="form-select"
                        onChange={handleInput}
                        name="gender"
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="review-form-item">
                      <label htmlFor="location">Location</label>
                      <textarea
                        onChange={handleInput}
                        name="Address"
                        className="p-2 mt-2"
                        placeholder="Input delivery location here"
                      ></textarea>
                    </div>

                    <div>
                      <button
                        className="review-submit-btn"
                        type="button"
                        onClick={changePage}
                      >
                        Next <MdKeyboardArrowRight size={20} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* Payment Info */
            <div className="payment-info-container py-5">
              <div className="Payment-icn">
                <img src={hourglass} width={170} alt="" />
              </div>
              <div className="account-information-cont">
                <div className="">
                  <div className="account">Total Amount: {total || 0}</div>
                </div>
                <div className="d-flex gap-1">
                  <div className="account d-flex justify-content-center align-items-center">
                    {textToCopy}{" "}
                    <div className="back ms-0" onClick={handleCopy}>
                      <FaRegCopy />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="account">Account Name : TAYE AWHANA</div>
                </div>
              </div>
              <div className="">
                <div className="account">Bank: Moniepoint MFB</div>
              </div>

              {/* Account Info */}
              <div className="mt-3 px-3">
                <button
                  className="review-submit-btn"
                  onClick={() => setUploadPage("")}
                  type="button"
                >
                  Next <MdKeyboardArrowRight size={20} />
                </button>
                <button
                  className="review-submit-btn ms-3"
                  onClick={() => setPage("form")}
                  type="button"
                >
                  Previous <MdKeyboardArrowLeft size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="back mt-3" onClick={() => window.history.back()}>
            <MdKeyboardArrowLeft size={30} />
          </div>
          <div className="logo p-4">
            <img src={background} alt="" width={170} />
          </div>
          <div className="breadcrumbs">
            home <MdKeyboardArrowRight /> cart <MdKeyboardArrowRight /> checkout{" "}
            <MdKeyboardArrowRight />
          </div>
          <div className="px-3">
            <p className="text-danger fw-bold">Avoid refreshing this page</p>
            <p className="text-danger fw-bold">
              Note:"Please upload your proof of payment here if the payment has
              been completed"
            </p>
          </div>
          <div className="payment-receipt">
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor="form-image" className="form-label mb-3">
                payment receipt
              </label>

              <input
                type="file"
                hidden
                id="form-image"
                onChange={handleImage}
              />
              <label
                htmlFor="form-image"
                className="upload-area"
                id="form-image"
              >
                {image ? (
                  <img src={URL.createObjectURL(image)} width={80} />
                ) : (
                  <LuUploadCloud size={80} />
                )}
              </label>
              <button
                className={
                  image ? "item-submit-btn-active" : "item-submit-btn "
                }
                type="submit"
              >
                {loader ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>
                    Submit <MdKeyboardArrowRight size={20} />
                  </span>
                )}
              </button>
              <button
                className="review-submit-btn ms-3"
                onClick={() => setPage("form")}
                type="button"
              >
                Previous <MdKeyboardArrowLeft size={20} />
              </button>
            </form>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Payment;
