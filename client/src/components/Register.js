import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import axios from "axios";

const URL = "http://localhost:7000";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showWarning, setAlert] = useState(false);
  const [showPasswordWarning, setPasswordAlert] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      setAlert(false);
      usersignUp();
    } else {
      setAlert(true);
    }
    //console.log("====>", password, "=======>", confirmpassword);
    if (password === confirmpassword) {
    } else {
      setPasswordAlert(true);
    }
    // setEmail("");
    // setPassword("");
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      setAlert(false);
      setPasswordAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [showWarning, showPasswordWarning]);

  // const usersignUp = async () => {
  //   console.log("====>", `${URL}/api/register`);
  //   await fetch(`${URL}/api/register`);
  // };
  const usersignUp = async () => {
    await axios
      .post(`${URL}/api/register`, {
        email: email,
        password: password,
        username: username,
      })
      //.then((res) => res.json())
      .then((data) => {
        console.log("data=====>", data);
        if (data.status !== 200) {
          alert(data.error_message);
        }
        if (data.status === 200) {
          console.log("message====>", data.message);
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container bg-gray-200 mx-auto flex flex-col max-w-lg px-7 py-5 mt-20">
      <div className="text-4xl font-bold py-12 text-center">
        Register your Account
      </div>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="text-xl px-2 content-start text-left py-2">User Name</div>
      <input
        type="email"
        name="email"
        id="email"
        className="border-2 border-indigo-200 rounded-lg text-lg px-3 py-1 w-full mb-3"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="text-xl px-2 content-start text-left py-2">
        Email Address
      </div>
      <input
        type="email"
        name="email"
        id="registeremail"
        className="border-2 border-indigo-200 rounded-lg text-lg px-3 py-1 w-full mb-7"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {showWarning && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2">
          <p className="font-bold"> Warning</p>
          <p>Email format is invalid</p>
        </div>
      )}
      <div className="text-xl px-2 text-left py-2">Password</div>
      <input
        type="password"
        name="password"
        id="registerpassword"
        className="border-2 border-indigo-200 rounded-lg text-lg px-3 py-1 w-full mb-3"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="text-xl px-2 text-left py-2">Confirm Password</div>
      <input
        type="password"
        name="password"
        id="confirmpassword"
        className="border-2 border-indigo-200 rounded-lg text-lg px-3 py-1 w-full mb-3"
        required
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {showPasswordWarning && (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2">
          <p className="font-bold"> Warning</p>
          <p>Password is different</p>
        </div>
      )}
      <div className="flex gap-4 justify-center my-12 w-full">
        <Button
          color="red"
          className=" text-xl text-center justify-center flex w-80"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </div>
      <p className="text-center">
        {" "}
        Already have an Account?{" "}
        <Link to="/login" className="text-blue-900">
          {" "}
          Log in{" "}
        </Link>
      </p>
      {/* </form> */}
    </div>
  );
};
export default Signup;
