import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/post.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// In summary, these lines are used to tell your server to accept any type of request body encoded in JSON format or URL-encoded format, with a maximum size of 30mb. The extended: true option allows for complex objects with nested properties to be parsed correctly. Without this, only simple key-value pairs would be parsed.

app.use(cors());

app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

const CONNECTION_URL = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(console.log(err.message)));
