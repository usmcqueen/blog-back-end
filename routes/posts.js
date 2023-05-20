import express from "express";
// import { format } from "date-fns";
import multer from "multer";
// import Post from "../controllers/post.js";

const app = express();
app.use(express.json());
// app.use("/api/posts", postRoutes);
const router = express.Router();

// app.listen(8080, ()=>{
//   console.log("Connected");
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/usmcqueen/Desktop/andreacapstone/client/public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../client/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, format(newDate(), "yyyy-MM-dd HH:mm:ss") + file.originalname);
//   },
// });

const upload = multer({ storage });

router.post("/upload", upload.single("file"), function (req, res) {
  console.log(req);
  const file = req.file;
  console.log('file error', req.body)
  res.status(200).json(file.filename);
});

// make sure to connect before adding my code:
// router.get("/test", (req, res) => {
//   res.json("AHOY, Matey!! You can now post");
// });
// router.get("/test", addPost);

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
