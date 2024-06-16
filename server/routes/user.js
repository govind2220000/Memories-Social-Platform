import express from "express";
import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/", (req, res) => {
  res.send("Hello to User API");
});

export default router;
