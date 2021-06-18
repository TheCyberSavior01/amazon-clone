import React from "react";
import "./Product.css";
import GradeIcon from "@material-ui/icons/Grade";
import { useStateValue } from "../../StateProvider";

export default function ProductItem(props) {
  const { id, title, image, price } = props.product;
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          <p>
            <GradeIcon></GradeIcon>
          </p>
          <p>
            <GradeIcon></GradeIcon>
          </p>
          <p>
            <GradeIcon></GradeIcon>
          </p>
          <p>
            <GradeIcon></GradeIcon>
          </p>
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add To Cart</button>
    </div>
  );
}
