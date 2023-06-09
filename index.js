import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import multerS3 from "multer-s3"
import cors from "cors";
import { S3Client } from '@aws-sdk/client-s3'
// import aws from "aws-sdk";


const app = express();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const Bucket = process.env.S3_BUCKET;

app.use(cookieParser());


app.use(
  cors({
    origin: "https://blog-capstone.herokuapp.com",
    // origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["access_token"],
  })
);

// app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());
// const cookies = new Cookies();
// app.set('maxHttpHeaderSize', 65536); 

// aws.config.update({
//   accessKeyId: process.env.ACCESS_KEY_ID,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   region: process.env.REGION,
//   Bucket: process.env.S3_BUCKET,

// });

const s3 = new S3Client({
  region: process.env.S3_REGION, 
  credentials:{
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  bucket: process.env.S3_BUCKET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: Bucket,
    acl: "public-read-write", 
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});


//use by upload form
// app.post('/api/upload', upload.single('file'), function (req, res) {
//   console.log('upload request: ', req)
//   res.send({
//       message: "Uploaded!",
//       urls: req.file.map(function(file) {
//           return {url: file.location, name: file.key, type: file.mimetype, size: file.size};
//       })
//   });
// });

app.post('/api/upload', upload.single('file'), function (req, res) {
  console.log('upload request: ', req);
  res.send({
    message: "Uploaded!",
    // urls: req.files.map(function(file) {
    //   return {url: file.location, 
    //     name: file.key, 
    //     type: file.mimetype, 
    //     size: file.size};
    // }),
    urls: {
      url: req.file.location,
      name: req.file.key,
      type: req.file.mimetype,
      size: req.file.size
    }
  });
});


// app.post('/api/upload', upload.single('file'), function (req, res) {
//   console.log('upload request: ', req)
//   res.send({
//       message: "Uploaded!",
//       imageUrl: imageUrl
//   });
// });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ 
//   storage: storage 
// });

// app.post("/api/upload", upload.single("file"), function (req, res) {
//   try {
//     const file = req.file;
//     res.status(200).json(file.filename);
//     console.log("image uploaded successfully")
//   } catch (error) {
//     console.log(error)
//   }

// });

// app.use('/api', userRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/test", (req, res) => {
  res.json("Ahoy, Matey!");
});

const port = process.env.PORT || 5000

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${port}`);
});

// app.listen(PORT, () => console.log("Server started on port" + PORT));

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Server started on port ${process.env.PORT || 8080}`);
// });


