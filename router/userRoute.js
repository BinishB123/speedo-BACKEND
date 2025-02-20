import e from "express";
import upload from "../middleware/multer.js";
import { uploadTripData } from "../controller/user.js";

const userRouter = e.Router()

userRouter.post('/uploadData',upload.single("file"),uploadTripData)



export  default userRouter