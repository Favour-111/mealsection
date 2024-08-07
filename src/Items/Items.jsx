import React from "react";
import { IoAdd } from "react-icons/io5";
import "./Items.css";
import { FaNairaSign } from "react-icons/fa6";
const Items = (props) => {
  const { title, price, image, id, category } = props;
  return (
    <>
      <div className="List" key={id}>
        <div>
          <img src={image} alt="" className="product_img" />
        </div>
        <div className="com">
          <div>
            <div className="category">{category}</div>
            <div className="name">{title.slice(0, 30)}......</div>

            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="price d-flex align-items-center mt-1">
                <FaNairaSign />
                {price}
              </div>
            </div>
          </div>

          <button className="addCart">
            <IoAdd />
            add
          </button>
        </div>
      </div>
    </>
  );
};

export default Items;
