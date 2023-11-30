import express from "express";
import cors from "cors";
import Signup from "./routes/Signup.js";
import Login from "./routes/Login.js";
import Post from "./routes/Post.js";

const app = express();

const PORT = 7000;
const users = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello, world!",
  });
});

app.use("/api/register", Signup);
app.use("/api/login", Login);
app.use("/api/create", Post);

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});
