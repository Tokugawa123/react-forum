import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const URL = "http://localhost:7000";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setAlert] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      setAlert(false);
      userLogin();
    } else {
      setAlert(true);
    }
    // setEmail("");
    // setPassword("");
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [showWarning]);

  const userLogin = () => {
    fetch(`${URL}/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User logged in===>", data);
        if (data.message) {
          navigate("/dashboard");
          localStorage.setItem("_id", data.id);
          if (data.error_messge) {
            alert(data.error_message);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container bg-gray-200 mx-auto flex flex-col max-w-lg px-7 py-5 mt-32">
      <div className="text-4xl font-bold py-12 text-center">
        Log into your Account
      </div>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="text-xl px-2 content-start text-left py-2">
        Email Address
      </div>
      <input
        type="email"
        name="email"
        id="email"
        className="border-2 border-indigo-200 rounded-lg text-lg px-3 py-1 w-full mb-3"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {showWarning && (
        <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2">
          <p className="font-bold"> Warning</p>
          <p>Email format is invalid</p>
        </div>
      )}
      <div className="text-xl px-2 text-left py-2">Password</div>
      <input
        type="password"
        name="password"
        id="password"
        className="border-2 border-indigo-200 rounded-lg text-lg px-3 py-1 w-full"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-4 justify-center my-12 w-full">
        <Button
          color="red"
          className=" text-xl text-center justify-center flex w-80"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </div>
      <p className="text-center">
        {" "}
        Don't have an Account?{" "}
        <Link to="/register" className="text-blue-900">
          {" "}
          Create one{" "}
        </Link>
      </p>
      {/* </form> */}
    </div>
  );
};
export default Login;
