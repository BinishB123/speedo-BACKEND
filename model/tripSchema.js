import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  tripName: { type: String, unique: true, required: true },
  gpsData: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      timestamp: { type: Date, required: true },
      ignition: { type: String, enum: ["on", "off"], required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip
