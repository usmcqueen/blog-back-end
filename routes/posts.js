import express from "express";
import { format } from "date-fns";
import multer from "multer";

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
  const file = req.img;
  console.log('file error ', req.body)
  res.status(200).json(file);
});

// router.get("/music-posts", async (req, res) => {
//   try {
//     const musicPosts = await fetchMusicPosts();
//     res.json(musicPosts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch music posts" });
//   }
// });

// router.get("/food-posts", async (req, res) => {
//   try {
//     const foodPosts = await fetchFoodPosts();
//     res.json(foodPosts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch food posts" });
//   }
// });

// router.get("/technology-posts", async (req, res) => {
//   try {
//     const technologyPosts = await fetchTechnologyPosts();
//     res.json(technologyPosts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch technology posts" });
//   }
// });

// router.get("/science-posts", async (req, res) => {
//   try {
//     const sciencePosts = await fetchSciencePosts();
//     res.json(sciencePosts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch science posts" });
//   }
// });

// router.get("/disney-posts", async (req, res) => {
//   try {
//     const disneyPosts = await fetchDisneyPosts();
//     res.json(disneyPosts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch disney posts" });
//   }
// });

// router.get("/baseball-posts", async (req, res) => {
//   try {
//     const baseballPosts = await fetchBaseballPosts();
//     res.json(baseballPosts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch baseball posts" });
//   }
// });

// router.post("/upload, upload.single("file"), function(req, res) {
//   const file = req.file;
//   req.status(200).json(file.filename);
// });

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
