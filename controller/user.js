import STATUS_CODES from "../constants/statusCodes.js";
import {
  deleteTripsService,
  fetchTripDataAndCalculateALlRequiredData,
  fetchTripService,
  uploadFileService,
} from "../service/user.js";

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

const fetchTripController = async (req, res, next) => {
  try {
    const { id } = req.params;
   
    const response = await fetchTripService(id);
    return res.status(STATUS_CODES.SUCCESS.OK).json(response);
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

const fetchTripDataWithRequiredDetailController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetchTripDataAndCalculateALlRequiredData(id);
    return res.status(STATUS_CODES.SUCCESS.OK).json(response);
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

const deleteTrips = async (req, res, next) => {
  try {
    let { ids ,userid} = req.params;
    ids = ids.split(",");
    
    const response = await deleteTripsService(userid,ids);
    return res.status(STATUS_CODES.SUCCESS.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export {
  uploadTripData,
  fetchTripController,
  fetchTripDataWithRequiredDetailController,
  deleteTrips,
};
