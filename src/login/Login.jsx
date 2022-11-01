import { Button, Input, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignin, isAuth } = React.useContext(AuthContext);
  const [err, handleError] = useState({ userName: null, password: null });

  const handleUserLogin = useCallback(() => {
    if (userName === "foo" && password === "bar") {
      handleSignin({ userName, password });
      navigate("/home");
    } else {
      let usernameErr = null;
      let passwordErr = null;
      if (userName && userName !== "foo") {
        usernameErr = "Enter valid username";
      } else if (userName.trim() === "") {
        usernameErr = "User name can't be blank";
      }
      if (password && password !== "bar") {
        passwordErr = "Enter valid password";
      } else if (password.trim() === "") {
        passwordErr = "Password can't be blank";
      }
      handleError({ userName: usernameErr, password: passwordErr });
    }
  }, [userName, password]);

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login-container mt20">
      <Row>
        <h2 className="mauto">Login</h2>
      </Row>
      <Row>
        <label className="mt10">User Name</label>
        <Input
          onChange={(e) => {
            setUserName(e.target.value);
            handleError({ ...err, userName: null });
          }}
          className="mt10"
          placeholder="user name is foo"
        />
        <Row className="error">{err.userName}</Row>
      </Row>
      <Row>
        <label className="mt20">Password</label>
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
            handleError({ ...err, password: null });
          }}
          className="mt10"
          placeholder="password is bar"
        />
        <Row className="error">{err.password}</Row>
      </Row>

      <Button
        onClick={handleUserLogin}
        className="mt20 ant-input"
        type="primary"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
