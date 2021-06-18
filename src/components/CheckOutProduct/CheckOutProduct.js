import React from "react";
import { useStateValue } from "../../StateProvider";
import "./CheckOutProduct.css";

function CheckOutProduct({ id, image, title, price }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      id: id,
      type: "REMOVE_FROM_BASKET",
    });
  };

  return (
    <div className="checkOutProduct">
      <img className="checkOutProduct_image" alt="" src={image} />

      <div className="checkOutProduct_info">
        <p className="checkOutProduct_title">{title}</p>
        <p className="checkOutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <button onClick={removeFromBasket}>Remove from Cart</button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
