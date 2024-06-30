import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET_KEY;
const BACKEND_URL = process.env.DEPLOYED_BACKEND_URL;
const FRONTEND_URL = process.env.DEPLOYED_FRONTEND_URL;
const EMAIL = process.env.EMAIL;
const MAIL_PASS = process.env.MAIL_APP_PASSWORD;
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    //console.log(oldUser);

    if (!oldUser) {
      res.json("User does not exist");
      return;
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `${BACKEND_URL}/resetPassword/${oldUser._id}/${token}`;
    const messageMail = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #007BFF;">MemoryMiles Password Reset Request</h2>
      <p>Dear User,</p>
      <p>We received a request to reset your password for your MemoryMiles account. Click the link below to reset your password:</p>
      <p style="text-align: center;">
        <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
          Reset Password
        </a>
      </p>
      <p>If you did not request a password reset, please ignore this email. This link will expire in 5 minutes.</p>
      <p>Thank you,<br>MemoryMiles Team</p>
      <p style="font-size: 12px; color: #777;">
        <strong>Note:</strong> Please do not reply to this e-mail, this is a system generated email sent from an unattended mailbox.
      </p>
    </div>`;
    console.log(link);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: EMAIL,
        pass: MAIL_PASS,
      },
    });
    transporter.sendMail({
      from: { name: "MemoryMiles", address: EMAIL }, // sender address
      to: oldUser.email, // list of receivers
      subject: "MemoryMiles Forgot Password✔", // Subject line
      html: messageMail, // html body
    });
    res.status(200).json("Mail has been sent successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong");
  }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  try {
    const oldUser = await User.findById(id);
    if (!oldUser) {
      res.json("User does not exist");
      return;
    }
    const secret = JWT_SECRET + oldUser.password;
    const verify = jwt.verify(token, secret);
    res.redirect(`${FRONTEND_URL}/${oldUser._id}/${token}`);
  } catch (error) {
    console.log(error.message);
    res.json("User not verified or Something went wrong");
  }
};
export const changePassword = async (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;
  // console.log(req.params);
  // console.log(password);
  try {
    if (password != confirmPassword) {
      return res.json("Passwords dont match");
    }
    const oldUser = await User.findById(id);
    if (!oldUser) {
      res.json("User does not exist");
      return;
    }
    const secret = JWT_SECRET + oldUser.password;
    const verify = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    res.status(200).json("Password Updated Successfully");
  } catch (error) {
    console.log(error.message);
    res.json("User not verified or Something went wrong");
  }
};
