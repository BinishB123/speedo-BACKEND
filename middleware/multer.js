import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadPath = path.join(__dirname, "../public/files");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log(" aving file to:", uploadPath);
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
