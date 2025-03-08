import express from "express";
import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
import cors from "cors"
import authRouter from "./router/auth.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenvConfig();


mongoose
  .connect(process.env.MONGO_URL + "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongoose connection error:", err.message));

app.use(express.json())
app.use(cookieParser())
app.use("/public", express.static(path.resolve(__dirname, "public")));
app.use(cors({
    origin:"https://speedo-frontend.vercel.app",
    methods: "GET, PUT, POST, PATCH, OPTIONS, DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true, 
}))

app.use('/auth',authRouter)
app.use('/',userRouter)
app.use(errorHandler)


app.listen(3000, () => {
  console.log("http://localhost:3000");
});
