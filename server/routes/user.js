import express from "express";
import {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/forgotpassword", forgotPassword);
router.get("/resetPassword/:id/:token", resetPassword);
router.post("/resetPassword/:id/:token", changePassword);

router.get("/", (req, res) => {
  res.send("Hello to User API");
});

export default router;
