const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")(
  "sk_test_51J3jQkLuoK93339rmr4e85llkK1ffOHfTs2QmLROQzeOSTG7GSM0M0kcwEhZvgfsYxGcFOTxhvunEbz7VtYqwI4J00FCDilwl1"
);

// Building the API

// 1. App Config
const app = express();

// 2. MiddleWares
app.use(cors({ origin: true }));
app.use(express.json());

// 3. API Routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// 4. Listen Command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-4e875/us-central1/api
