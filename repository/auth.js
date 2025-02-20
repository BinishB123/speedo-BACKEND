import STATUS_CODES from "../constants/statusCodes.js";
import CustomError from "../middleware/errorHandling.js";
import userModel from "../model/userSchema.js";

const loginRepo = async (email, password) => {
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new CustomError(
        "No user with this email Id",
        STATUS_CODES.CLIENT_ERROR.NOT_FOUND
      );
    } else if (user.password !== password) {
      throw new CustomError(
        "Incorrect Password",
        STATUS_CODES.CLIENT_ERROR.FORBIDDEN
      );
    }
    return {id: user._id };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

export { loginRepo };
