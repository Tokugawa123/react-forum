import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const Signout = () => {
    localStorage.removeItem("_id");
    navigate("/");
    alert("User has signed out");
  };

  const signOut = () => {
    localStorage.removeItem("_id");
    navigate("/");
  };
  return (
    <nav>
      <div className="flex justify-between p-5 bg-brown-800 text-yellow-50">
        <h2 className="text-xl font-semibold px-12">Threadify</h2>
        <button onClick={Signout} className="text-xl font-bold mx-12">Sign out</button>
      </div>
    </nav>
  );
};
export default Nav;
