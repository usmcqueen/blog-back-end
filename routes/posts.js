// import express from "express";

const express = require('express');
const router = express.Router();

const {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} = require('../controllers/post.js');

// import {
//   addPost,
//   deletePost,
//   getPost,
//   getPosts,
//   updatePost,
// } from "../controllers/post.js";

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);


module.exports = router;

// export default router;
