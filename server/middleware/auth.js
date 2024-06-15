import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 300;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decodedData?.id;
      //console.log("Hii ", req.userId);
    } else {
      decodedData = jwt.decode(token);
      console.log("yup", decodedData);
      req.userId = decodedData?.sub;
      // const sub = req.headers.authorization;
      // req.userId = sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
