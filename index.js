import express from "express";
import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
import cors from "cors"
import authRouter from "./router/auth.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
const app = express();
dotenvConfig();


mongoose
  .connect(process.env.MONGO_URL + "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongoose connection error:", err.message));

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:" http://localhost:5173",
    methods: "GET, PUT, POST, PATCH, OPTIONS, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true, 
}))

app.use('/auth',authRouter)
app.use(errorHandler)


app.listen(3000, () => {
  console.log("http://localhost:3000");
});
