import React from "react";
import banner from "../assets/Screenshot 2024-08-05 125957.png";
import "./Page.css";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { LuShoppingBasket } from "react-icons/lu";

const Page = () => {
  return (
    <div>
      <img src={banner} alt="" className="banner" />
      <div className="disc ">
        <div>
          <div className="icons2">
            <CiLocationOn />
          </div>
          <div>
            Set delivery location Specify the delivery destination for your
            product
          </div>
        </div>
        <div>
          <div className="icons2">
            <LuShoppingBasket />
          </div>
          <div>
            Choose a product Explore shops located anywhere within the school.
          </div>
        </div>
        <div>
          <div className="icons2">
            <IoMdTime />
          </div>
          <div>
            Get it delivered to your doorstep. Your delivery will arrive
            promptly.
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="names">campus mart</div>
      </div>
      <div className="campusList">
        <Link to="/cafeteria">
          <div data-aos="zoom-out-right">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
              alt=""
              className="banner"
            />
          </div>
        </Link>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
      </div>
      <div className="p-4">
        <p className="names">campus mart(BOC)</p>
      </div>
      <div className="campusList">
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
        <div data-aos="zoom-out-right">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/65/Chicken_Republic_Akure.jpg"
            alt=""
            className="banner"
          />
        </div>
      </div>
      <div className="abt">
        <div>
          <p className="header">mealsection.</p>
          <p className="written_txt">
            MealSection ensures a delightful culinary experience with a diverse
            menu and a user-friendly platform for easy ordering. Standout
            features include varied cuisines, efficient delivery, a
            user-friendly interface, rewarding promotions, transparent
            communication, and a commitment to continuous improvement. Join us
            for a satisfying culinary journey; we deliver more than just food –
            we deliver an experience.
          </p>
          <button>continue shopping</button>
        </div>
        <div>
          <img
            src="https://png.pngtree.com/png-clipart/20230819/original/pngtree-female-bike-courier-with-food-delivery-semi-flat-rgb-color-vector-illustration-picture-image_8058167.png"
            alt=""
            width={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
