const express = require("express");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const postRoutes = require("./routes/posts.js");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const cors = require("cors");
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
// const fs = require('fs');
// const { uploadFile, getFileStream } = require('./s3')
// import aws from "aws-sdk";


const app = express();



app.use(cookieParser());


app.use(
  cors({
    // origin: "https://blog-capstone.herokuapp.com",
    origin: "http://localhost:3000",
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


const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  // bucket: process.env.S3_BUCKET,
});

const bucket = process.env.S3_BUCKET;
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: Bucket,
//     acl: "public-read-write", 
//     key: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   }),
// });
const generateFilename = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

// const uploadFile = (fileBuffer, fileName, mimetype) => {
//   const uploadParams = {
//     Bucket: bucket,
//     Body: fileBuffer,
//     Key: fileName,
//     ContentType: mimetype
//   }
//   const command = new PutObjectCommand(uploadParams)
//   const response = await s3Client.send(command)
//   return response
// }


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
const getObjectSignedUrl = async (key) => {
  const params = {
    Bucket: bucket,
    Key: key
  }
  const command = new GetObjectCommand(params)
  const seconds = 360000
  const url = await getSignedUrl(s3Client, command, {expiresIn: seconds})

  return url
}

app.post('/api/upload', upload.single('file'), async function (req, res) {
  console.log('upload request: ', req.body);
  const file = req.file

  const fileName = generateFilename()
//  uploadFile(file.buffer, fileName, file.mimetype)

  const uploadParams = {
    Bucket: bucket,
    Body: file.buffer,
    Key: fileName,
    ContentType: file.mimetype
  }
  const command = new PutObjectCommand(uploadParams)
  const response = await s3Client.send(command)

  // GET URL 
  const imageURL = await getObjectSignedUrl(fileName)
console.log('image url: ', imageURL)
  res.json({
    message: "Uploaded!",
    imageURL,
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


