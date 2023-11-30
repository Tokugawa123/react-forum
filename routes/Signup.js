import express from "express";
import users from "../model/users.js";
const router = express();

const generateID = () => {
  Math.random().toString(36).substring(2, 10);
};
console.log("=====> Register");
router.post("/", async (req, res) => {
  console.log("=====> success");
  const { email, password, username } = req.body;
  const id = generateID();
  console.log({ email, password, username });

  const result = users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length === 0) {
    const newUser = { id, email, password, username };
    users.push(newUser);
    res.json({ message: "Account created successfully!", id: id });
  } else {
    res.json({ error_message: "User already exists!" });
  }
});

export default router;
