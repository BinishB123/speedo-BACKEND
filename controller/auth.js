import { loginService } from "../service/auth.js"


const loginController = async(req,res,next)=>{
    try {
        const {email,password} = req.body
     
        
        const response = await loginService(password,email)
        res.json(response)
    } catch (error) {
        console.log(error);
        
    }
}

export {loginController}