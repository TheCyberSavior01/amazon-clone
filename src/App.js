import "./App.css";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import CheckOut from "./components/CheckOut/CheckOut";
import Login from "./components/Login/Login";
import Payment from "./components/Payment/Payment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51J3jQkLuoK93339rKEXfXfQdy1peF0fBsbjANcpOrBipVSGuR6565DCJOwoCCTBi7aMfTfCAzlfQNrodEQQPwWeb00eCTK70k7"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/checkout">
            <Header />
            <CheckOut />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
