import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Forms.css";
import LoadingIndicator from "./LoadingIndicator";
function Form({ route, method }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  const HandleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, {username, password});
      if(method==="login"){
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      }
      else{
        navigate("/login")
      }
    } catch (error) {

        alert(error.message);
    }
    finally {
        setLoading(false);
    }
    // This function handles the form submission. It prevents the default behavior of the form and sends a POST request to the server with the username and password.
  };

  return (
    <form onSubmit={HandleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {name}
      </button>

    </form>
  );
}

export default Form;
