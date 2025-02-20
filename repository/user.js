import STATUS_CODES from "../constants/statusCodes.js";
import CustomError from "../middleware/errorHandling.js";
import Trip from "../model/tripSchema.js";

const createTrip = async (name, gpsData, userId) => {
  try {
    const created = await Trip.create({
      userId: userId,
      tripName: name,
      gpsData: gpsData,
    });
 
    return { id: created._id, name: created.tripName };
  } catch (error) {
    if (error.keyPattern.tripName=== 1) {
        throw new CustomError("User Another Trip Name ,This name is already Exist",STATUS_CODES.CLIENT_ERROR.CONFLICT);
 
    }
    throw new CustomError(error.message.error.statusCode);
  }
};
  

export  {createTrip}