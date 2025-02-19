import CustomError from "../middleware/errorHandling.js";
import userModel from "../model/userSchema.js";

const loginRepo = async (email, password) => {
  try {
    const created = await userModel.create({email: email});
    if(!created){
        throw new CustomError("No user with this email Id",500)

    }else if (created.password!==password) {
        throw new CustomError("Incorrect Password")
    }
    return { created };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

export { loginRepo };
