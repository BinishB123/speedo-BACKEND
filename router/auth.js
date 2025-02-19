import e from "express"
import { loginController } from "../controller/auth.js"

const authRouter  = e.Router()

authRouter.post('/login',loginController)



export default authRouter