import React, { useContext, useRef } from "react";
import { IoHome, IoHomeOutline, IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { RiCustomerService2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import "./Nav.css";
import { FaArrowDown } from "react-icons/fa";
import { ContextApi } from "../ShopContext/ShopContext";
const Nav = () => {
  const { totalCartItems } = useContext(ContextApi);
  const dropdown = useRef();
  const drop = () => {
    dropdown.current.classList.toggle("dropdown-active");
  };
  const removeDrop = () => {
    dropdown.current.classList.remove("dropdown-active");
  };
  return (
    <div>
      <nav>
        <div className="logo">mealsection</div>
        <div>
          <ul>
            <Link to="/" className="link">
              <li>
                <IoHomeOutline className="icons" />
                <span> Home</span>
              </li>
            </Link>
            <Link to="/cart" className="link">
              <li className="counterBody">
                <FiShoppingBag className="icons" />
                <div>
                  cart
                  <span className="counter">({totalCartItems()}) </span>
                </div>
              </li>
            </Link>
            <li>
              <CiHeart className="icons" />
              <span> wish List</span>
            </li>
            <li className="spec_list">
              <CiHeart className="icons" />
              <span>
                {" "}
                stores <IoIosArrowDown />
              </span>
            </li>
            <li
              className="spec_list"
              onMouseOver={drop}
              onMouseOut={removeDrop}
            >
              <CiHeart className="icons" />
              <span>
                Stores(Boc)
                <IoIosArrowDown />
              </span>
              <div className="dropdown" ref={dropdown}>
                <ul>
                  <li>Cafetaria</li>
                  <li>Cafetaria</li>
                  <li>Cafetaria</li>
                  <li>Cafetaria</li>
                  <li>Cafetaria</li>
                  <li>Cafetaria</li>
                  <li>Cafetaria</li>
                </ul>
              </div>
            </li>
            <li className="">
              <RiCustomerService2Line className="icons" />
              <span>Help</span>
            </li>
          </ul>
        </div>
        <div>
          <Avatar
            name="Meal Section"
            size="30"
            className="rounded-circle avatar"
          />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
