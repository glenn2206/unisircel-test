import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  function onChange(e) {
    setFormLogin(() => {
      return {
        ...formLogin,
        [e.target.name]: e.target.value,
      };
    });
    console.log(formLogin);
  }

  function onSubmit(e) {
    e.preventDefault();
    axios({
      url: "http://localhost:3000/login",
      method: "post",
      data: formLogin,
    })
      .then((data) => {
        localStorage.setItem("access_token", data.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={(e) => onChange(e)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            onSubmit(e);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
