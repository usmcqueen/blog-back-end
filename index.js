import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// import { format } from "date-fns";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
// import Server from "mysql2/typings/mysql/lib/Server.js";

const app = express();
// const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
    exposedHeaders: ["access_token"],
  })
);

// app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());
// const cookies = new Cookies();

// app.set('maxHttpHeaderSize', 65536); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ 
  storage: storage 
});

app.post("/api/upload", upload.single("file"), function (req, res) {
  try {
    const file = req.file;
    res.status(200).json(file.filename);
    console.log("image uploaded successfully")
  } catch (error) {
    console.log(error)
  }

});

// app.use('/api', userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/test", (req, res) => {
  res.json("Ahoy, Matey!");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

// app.listen(PORT, () => console.log("Server started on port" + PORT));

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server started on port ${process.env.PORT || 8080}`);
// });
