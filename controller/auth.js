import { generateToken } from "../helper/jwt.js";
import { loginService } from "../service/auth.js";

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await loginService(password, email);
    const token = generateToken(response.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      path: "/",
      maxAge:2*60*60*1000
    });
    res.json(response);
  } catch (error) {
    next(error);  
  }
};

export { loginController };
