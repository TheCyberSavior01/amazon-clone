import React from "react";
import "./Login.css";
import login_banner from "../../assets/login_photo.png";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../firebase";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert(
            "This user doesn't exist. Enter email, password and Hit 'Create Account' button"
          );
        }
      });
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img alt="" src={login_banner} className="login_photo" />
      </Link>

      <div className="login_container">
        <h1>Sign In</h1>

        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login_signin_button"
          >
            Sign In
          </button>
        </form>

        <p>By signing in, you agree to the terms and conditions</p>

        <button onClick={register} className="login_register_button">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
