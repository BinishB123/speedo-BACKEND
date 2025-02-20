import STATUS_CODES from "../constants/statusCodes.js";
import { uploadFileService } from "../service/user.js";

const uploadTripData = async (req, res, next) => {
  try {
    const { name, id } = req.body;
    if (!req.file || !name || !id) {
      return res
        .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
        .json({ message: "No file uploaded" });
    }
    const response = await uploadFileService(name, req.file, id);
    return res.status(STATUS_CODES.SUCCESS.OK).json(response);
  } catch (error) {
    
    next(error);
  }
};

export { uploadTripData };
