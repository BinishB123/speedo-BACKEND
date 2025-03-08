import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import CustomError from "../middleware/errorHandling.js";
import {
  createTrip,
  deleteTrips,
  fetchTrips,
  fetchTripsWithId,
} from "../repository/user.js";
import {
  calculateOverSpeedingDistance,
  calculateOverSpeedingDuration,
  calculateOverSpeedingPoints,
  calculateSpeeds,
  calculateStoppedDuration,
  calculateTotalDistance,
  calculateTravelDuration,
} from "../helper/tripHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseText(text) {
  return text
    .trim()
    .split("\n")
    .map((line, index) => {
      if (index !== 0) {
        const [latitude, longitude, timestamp, ignition] = line.split(",");
        return {
          latitude: Number(latitude),
          longitude: Number(longitude),
          timestamp: new Date(timestamp),
          ignition,
        };
      }
    })
    .filter(Boolean);
}

const uploadFileService = async (name, file, id) => {
  try {
    const filePath = path.join(__dirname, "../public/files", file.filename);
    const data = await fs.readFile(filePath, "utf-8");
    const gpsData = await parseText(data);
    await fs.unlink(filePath);
    const response = await createTrip(name, gpsData, id);
    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

const fetchTripService = async (id) => {
  try {
    const response = await fetchTrips(id);
    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};



const fetchTripDataAndCalculateALlRequiredData = async (id) => {
  try {
    const Trip = await fetchTripsWithId(id); 
    const distance = calculateTotalDistance(Trip.gpsData);
    const travelDuration = calculateTravelDuration(Trip);
    const {overspeedingPoints} = calculateOverSpeedingPoints(Trip)
    const overspeedingDuration = calculateOverSpeedingDuration(Trip);
    const overspeedingDistance = calculateOverSpeedingDistance(Trip);
    const stoppedDuration = calculateStoppedDuration(Trip);
    const trip = calculateSpeeds(Trip)
  
    
    
  
    return {
      trip:trip,
      tripData: Trip,
      distance: distance,
      travelDuration: travelDuration,
      overSpeedDuration: overspeedingDuration,
      overSpeedingDistance: overspeedingDistance,
      stoppedDuration: stoppedDuration,
      overSpeedingPoints:overspeedingPoints
    };
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};


const deleteTripsService = async (userid, ids) => {
  try {
   
     await deleteTrips(ids);
    const response = await fetchTrips(userid);
    return response;
  } catch (error) {
    throw new CustomError(error.message, error.statusCode);
  }
};

export {
  uploadFileService,
  fetchTripService,
  fetchTripDataAndCalculateALlRequiredData,
  deleteTrips,
  deleteTripsService,
};
