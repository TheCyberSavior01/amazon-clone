import React from "react";
import "./CheckOut.css";
import checkout_photo from "../../assets/checkout_img.jpg";
import Subtotal from "../Subtotal/Subtotal";
import { useStateValue } from "../../StateProvider";
import CheckOutProduct from "../CheckOutProduct/CheckOutProduct";
import FlipMove from "react-flip-move";

export default function CheckOut() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img className="checkout_ad" alt="" src={checkout_photo} />

        <div>
          <h2 className="checkout_title">Your Shopping Cart</h2>
          {basket.map((item) => (
            <CheckOutProduct
              image={item.image}
              title={item.title}
              price={item.price}
              id={item.id}
            />
          ))}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}
