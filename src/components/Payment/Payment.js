import React from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import CheckOutProduct from "../CheckOutProduct/CheckOutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import { useEffect } from "react";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

const Payment = () => {
  const history = useHistory();

  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setprocessing] = useState(false);
  const [succeeded, setSucceeded] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setprocessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setprocessing(false);

        history.replace("/orders");
      });
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angelas, CA</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and Order</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment_price">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
