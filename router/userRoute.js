import e from "express";
import upload from "../middleware/multer.js";
import { deleteTrips, fetchTripController,  fetchTripDataWithRequiredDetailController, uploadTripData } from "../controller/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = e.Router()

userRouter.post('/uploadData',authMiddleware,upload.single("file"),uploadTripData)
userRouter.get('/fetechtrips/:id',authMiddleware,fetchTripController)
userRouter.get('/getTripDetails/:id',authMiddleware,fetchTripDataWithRequiredDetailController)
userRouter.delete('/deleteTrips/:ids/:userid',authMiddleware,deleteTrips)


export  default userRouter