import express from "express";
import users from "../model/users.js";
const Router = express();

Router.post("/", async (req, res) => {
  console.log(users);
  const { email, password } = req.body;
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  if (result.length !== 1) {
    res.json({
      error_message: "Incorrect credentials",
    });
  }
  //👇🏻 Returns the id if successfuly logged in
  else
    res.json({
      message: "Login successfully",
      id: result[0].id,
    });
});
export default Router;
