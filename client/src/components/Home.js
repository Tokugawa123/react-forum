import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:7000";
const Home = () => {
  const navigate = useNavigate();
  const [thread, setThread] = useState("");
  const [threadlist, setThreadlist] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ thread });
    createdThread();
    setThread("");
  };
  useEffect(() => {
    const checkuser = () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        console.log("Authenticated!");
      }
    };
    checkuser();
  }, [navigate]);

  const createdThread = () => {
    axios
      .post(`${URL}/api/create/thread`, {
        thread: thread,
        userId: localStorage.getItem("_id"),
      })
      .then((data) => {
        console.log(data);
        setThreadlist(data.threads)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <Nav />
      <div className="container  mx-auto  justify-center w-full bg-blue-100">
        <div className="text-6xl font-extrabold text-center pt-12 pb-24">
          Create a Thread
        </div>
        <div className="w-full py-5">
          <div className="flex justify-center">
            <label htmlFor="thread" className="text-2xl mx-3 pt-2 font-semibold font-serif text-purple-700">
              Title / Description:
            </label>
            <input
              type="text"
              name="thread"
              className="border focus:border-red-300 border-green-300 border-solid focus:outline-none rounded text-xl px-5 py-3 shadow w-2/3"
              required
              value={thread}
              onChange={(e) => setThread(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center py-12 pl-7">
          <button className="text-xl font-serif font-extrabold text-white bg-pink-600 hover:bg-pink-400 active:bg-purple-900 p-4 rounded-lg shadow-lg">CREATE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
