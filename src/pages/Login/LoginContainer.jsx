import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const LoginContainer = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/auth/login?username=${userName}&password=${password}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.detail || "Login failed. Please try again.";
        setErrorMessage(errorMsg);
        console.error("Login failed:", errorMsg);
      } else {
        const data = await response.json();
        console.log("Login successful:", data);
        navigate("/search");
        window.location.reload();
      }
    } catch (error) {
      // Handle fetch or network errors
      console.error("Error:", error);
      setErrorMessage(
        "An error occurred while trying to log in. Please try again."
      );
    }
  };

  return (
    <Login
      userName={userName}
      password={password}
      setUserName={setUserName}
      setPassword={setPassword}
      handleLogIn={handleLogIn}
      errorMessage={errorMessage}
    />
  );
};

export default LoginContainer;
