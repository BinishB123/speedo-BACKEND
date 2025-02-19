import CustomError from "../middleware/errorHandling.js"
import { loginRepo } from "../repository/auth.js"


const loginService =  async(password,email)=>{
    try {
        const response = await loginRepo(email,password)
        return response  
    } catch (error) {
        throw new CustomError(error.message,error.statusCode)
    }
}


export {loginService}