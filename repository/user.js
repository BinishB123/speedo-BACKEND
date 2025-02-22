import mongoose from "mongoose";
import STATUS_CODES from "../constants/statusCodes.js";
import CustomError from "../middleware/errorHandling.js";
import Trip from "../model/tripSchema.js";

const createTrip = async (name, gpsData, userId) => {
  try {
      await Trip.create({
      userId: userId,
      tripName: name,
      gpsData: gpsData,
    });

    const recentData = await Trip.aggregate([
        {$match:{userId:new mongoose.Types.ObjectId(userId)}},
        {$sort:{createdAt:-1}},
        {$limit:8},
        {$project:{
            _id:1,
            tripName:1
        }}
    ])
 
    return recentData;
  } catch (error) {
    if (error.keyPattern.tripName=== 1) {
        throw new CustomError("User Another Trip Name ,This name is already Exist",STATUS_CODES.CLIENT_ERROR.CONFLICT);
 
    }
    throw new CustomError(error.message.error.statusCode);
  }
};


const fetchTrips = async(id)=>{
    try {
        const data = await Trip.aggregate([
            {$match:{userId:new mongoose.Types.ObjectId(id)}},
            {$limit:8},
            {$sort:{createdAt:-1}},
            {$project:{
                _id:1,
                tripName:1
            }}
        ])
        
        return data 
    } catch (error) {
        
        throw new CustomError(error.message.error.statusCode);
 
    }
}

const fetchTripsWithId = async(id) =>{
    try {
        const response = await Trip.findOne({_id:new mongoose.Types.ObjectId(id)})    
        return response
    } catch (error) {
        throw new CustomError(error.message.error.statusCode)
    }
}


const deleteTrips = async(ids)=>{
    try {
        
        const deleteIds = ids.map((data)=>new mongoose.Types.ObjectId(data+"")) 
        const response = await Trip.deleteMany({_id:{$in:deleteIds}})     
        return response 
    } catch (error) {
        throw new CustomError(error.message.error.statusCode)

    }
}
  

export  {createTrip,fetchTrips,fetchTripsWithId,deleteTrips}