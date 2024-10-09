import React from "react";
import "./Order.css";
import lottiefile from "./Animation - 1727094209352.json";
import lottie from "../assets/Animation - 1725013554580.json";
import logo from "../assets/WhatsApp Image 2024-08-24 at 20.18.12_988ce6f9.jpg";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
const Order = () => {
  return (
    <div>
      <div className="p-4">
        <img src={logo} width={200} alt="" />
      </div>
      <div className="lottie-background">
        <div>
          <Player autoplay loop src={lottiefile} className="lottiefiles2">
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player>
        </div>
        <div>
          <p className="lottie-content">
            Your package will be delivered shortly
          </p>
        </div>
        <div>
          <button
            className="coninue-btn rounded"
            onClick={() => window.location.replace("/store")}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
