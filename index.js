import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// import { format } from "date-fns";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
// import Server from "mysql2/typings/mysql/lib/Server.js";
import aws from "aws-sdk";
import multers3 from "multer-s3"

// import { SimpleFileUpload } from 'react-simple-file-upload';

const app = express();


app.use(cookieParser());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://blog-capstone.herokuapp.com');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


app.use(
  cors({
    origin: "https://blog-capstone.herokuapp.com",
    credentials: true,
    exposedHeaders: ["access_token"],
  })
);

// app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());
// const cookies = new Cookies();
// app.set('maxHttpHeaderSize', 65536); 

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: "cap-img", 
    acl: "public-read", // Set the appropriate ACL permissions for your use case
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});


//use by upload form
app.post('/api/upload', upload.array('upl', 25), function (req, res) {
  res.send({
      message: "Uploaded!",
      urls: req.files.map(function(file) {
          return {url: file.location, name: file.key, type: file.mimetype, size: file.size};
      })
  });
});

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
