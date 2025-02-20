import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import CustomError from "../middleware/errorHandling.js";
import { createTrip } from "../repository/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseText(text) {
  return text
    .trim()
    .split("\n")
    .map((line, index) => {
      if (index !== 0) {
        const [latitude, longitude, timestamp, ignition] = line.split(",");
        return { latitude:Number(latitude),longitude: Number(longitude),timestamp:new Date(timestamp), ignition };
      }
    }); 
}

const uploadFileService = async (name,file,id) => {
  try {   
    const filePath = path.join(__dirname, "../public/files", file.filename);
    const data = await fs.readFile(filePath, "utf-8");
    const gpsData = await parseText(data);
    await fs.unlink(filePath);
    const response = await createTrip(name,gpsData,id)
    return response
  } catch (error) {
    throw new CustomError(error.message,error.statusCode)
  }
};
  
export { uploadFileService };
