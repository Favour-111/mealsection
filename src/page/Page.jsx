import React, { useEffect, useState } from "react";
import "./Page.css";
import { RiArrowRightSLine } from "react-icons/ri";
import pasta from "../assets/pasta.png";
import Drinks from "../assets/soft-drink (2).png";
import junk from "../assets/fast-food.png";
import pastry from "../assets/pastry.png";
import bike from "../assets/delivery-bike.png";
import Placeholder from "../assets/placeholder.png";
import shoppingcart from "../assets/shopping-cart.png";
import banner from "../assets/banner.jpg";
import Nav from "../Nav/Nav";
import Vendors from "../Vendors/Vendors";
import { TbCurrencyNaira, TbMotorbike } from "react-icons/tb";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import { FaStar, FaStore, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { ImQuotesLeft } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import FeedBack from "../FeedBack/FeedBack";

const Page = () => {
  const Navigate = useNavigate();
  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal, setModal] = useState([]);
  const [shuffledVendors, setShuffledVendors] = useState([]);

  // Function to shuffle vendors using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    setShuffledVendors(shuffleArray(Vendors)); // Shuffle vendors on component mount
  }, []);

  // Fetch modal data
  const getAllModal = async () => {
    try {
      const response = await axios.get("https://msback.onrender.com/note");
      setModal(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllModal();
  }, []);

  // Check if modal has been shown
  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (modalShown) {
      const timer = setTimeout(() => {
        setModalIsOpen(true);
        // localStorage.setItem("modalShown", "true"); // Set flag to prevent future display
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 6;

  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = shuffledVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(Vendors.length / vendorsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Fetch reviews
  const [review, setReview] = useState([]);
  const [loader, setLoader] = useState(false);
  const getAllReviews = async () => {
    try {
      setLoader(true);
      const response = await axios.get("https://msback.onrender.com/allReivew");
      setReview(response.data.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <>
      <Nav />
      <div className="PageBody">
        {/* Breadcrumbs */}
        <div className="breadcrumb-container">
          <div className="bread-crumbs_content">
            <div className="bread-crumb-head">MealSection</div>
            <div style={{ fontSize: 16, fontWeight: "500" }}>
              Home <RiArrowRightSLine /> Vendors
            </div>
          </div>
        </div>

        {/* Offer Section */}
        <div className="offer-container">
          <div className="d-md-flex d-sm-block align-items-center justify-content-between">
            <div className="offer-header">What we offer at MealSection</div>
            <div className="arrows-direction-container">
              <div>
                <FiArrowLeft />
              </div>
              <div>
                <FiArrowRight />
              </div>
            </div>
          </div>

          <div className="what-we-offer-container mt-3">
            <div className="offer-items shadow-sm rounded">
              <div className="shadow-sm p-3 rounded-circle">
                <img src={bike} width={80} />
              </div>
              <div>
                <div className="offer-items-header">Choose a product</div>
                <div className="offer-items-content">
                  Explore Vendors located anywhere within the school.
                </div>
              </div>
            </div>
            <div className="offer-items shadow-sm rounded">
              <div className="shadow-sm p-3 rounded-circle">
                <img src={Placeholder} width={80} />
              </div>
              <div>
                <div className="offer-items-header">
                  Get it delivered to your doorstep.
                </div>
                <div className="offer-items-content">
                  Your delivery will arrive promptly.
                </div>
              </div>
            </div>

            <div className="offer-items shadow-sm rounded">
              <div className="shadow-sm p-3 rounded-circle">
                <img src={shoppingcart} width={80} />
              </div>
              <div>
                <div className="offer-items-header">Set Delivery Location</div>
                <div className="offer-items-content">
                  Specify the delivery destination for your product
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Section */}
        <div className="banner">
          <div className="banner-container">
            <img src={banner} alt="" width="70%" />
            <div className="button-cont"></div>
          </div>
        </div>

        {/* feed back  */}
        <FeedBack />
        {/* Category Section */}
        <div className="Category">
          <div className="category-head-container">
            <div className="categories_Subhead ">categories</div>
            <div className="category-head text-center mt-3">
              Browse by Category
            </div>
          </div>

          <div className="category_container">
            <div className="category_item shadow-sm p-2 rounded">
              <div className="category-image">
                <img src={pasta} alt="" width={70} />
              </div>
              <div className="category-content">Food</div>
            </div>
            <div className="category_item shadow-sm p-2 rounded">
              <div className="category-image">
                <img src={Drinks} alt="" width={70} />
              </div>
              <div className="category-content">Soft Drinks</div>
            </div>
            <div className="category_item shadow-sm p-2 rounded">
              <div className="category-image">
                <img src={junk} alt="" width={70} />
              </div>
              <div className="category-content">Junks</div>
            </div>
            <div className="category_item shadow-sm p-2 rounded">
              <div className="category-image">
                <img src={pastry} alt="" width={70} />
              </div>
              <div className="category-content">Pastries</div>
            </div>
          </div>
        </div>

        {/* Vendor List */}
        <div>
          <div className="vendor_head_container ">
            <div className="vendor-sub_head">Choose desired vendor</div>
            <div className="Vendor-head text-center my-3">
              😍Explore Vendors
            </div>
          </div>

          <div className="vendor-list-container">
            {currentVendors.map((item, index) => (
              <div
                onClick={() => {
                  window.scrollTo(0, 0);
                  Navigate(`/${item.name}`);
                }}
                key={index}
                className="vendor-items shadow-sm"
              >
                <img src={item.Image} alt={item.name} />
                <div className="vendor-contents">
                  <div>
                    <FaStore className="me-1" />
                    {item.name}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-1">
                      <div>
                        <TbMotorbike size={18} />
                      </div>
                      <div>
                        <TbCurrencyNaira size={18} />
                      </div>
                      <div>|</div>
                      <div>10-30min</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaStar color="orange" className="mx-1" />5
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="pagination-container mb-5">
            {pageNumbers.map((number) => (
              <div
                key={number}
                className={`page-item ${
                  number === currentPage ? "active" : ""
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <div className={modalIsOpen ? "modal-body-Active" : "modal-body"}>
          <div className="modal-container shadow">
            <div className="d-flex align-items-center justify-content-between">
              <div className="modal-header">Announcement!!</div>
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
              <div className="modal-content">
                {modal.length > 0 ? (
                  modal.map((item, index) => (
                    <div key={index}>
                      <p>{item.note}</p>
                    </div>
                  ))
                ) : (
                  <p>No announcements available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
