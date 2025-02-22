import e from "express";
import upload from "../middleware/multer.js";
import { deleteTrips, fetchTripController,  fetchTripDataWithRequiredDetailController, uploadTripData } from "../controller/user.js";

const userRouter = e.Router()

userRouter.post('/uploadData',upload.single("file"),uploadTripData)
userRouter.get('/fetechtrips/:id',fetchTripController)
userRouter.get('/getTripDetails/:id',fetchTripDataWithRequiredDetailController)
userRouter.delete('/deleteTrips/:ids/:userid',deleteTrips)


export  default userRouter