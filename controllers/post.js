import { db } from "../db.js";
import jwt from "jsonwebtoken";
// import Cookies from "universal-cookie";


export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (error, data) => {
    if (error) return res.status(500).json({ error: 'An error occurred while fetching the post.' });

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {

  const postId = req.params.postId;

  const q =
    "SELECT p.id, username, title, desc, p.img, u.img AS userImg, p.cat, p.date FROM users u JOIN posts p on u.id = p.uid WHERE p.id = ?";

  db.query(q, [postId], (error, data) => {
    if (error) return res.status(500).json({ error: 'An error occurred while fetching the post.' });


    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  console.log('token:', token);

  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    // const postId = req.params.postId;

    const q = "INSERT INTO posts (`title`, `content`, `img`, `cat`, `date`) VALUES (?, ?, ?, ?, ?, ?)";

    // const q =
    //   "INSERT INTO posts title, `desc`, img, cat, `date`, uid VALUES (?, ?, ?, ?, ?, ?)";

      // "INSERT INTO posts,`title`, `desc`, `img`, `cat`, `date`, `uid` VALUES (?)";

    const values = [
      req.body.title,
      req.body.content,
      req.body.img,
      req.body.cat,
      req.body.date,
      // postId,
      userInfo.id,
    ];

    db.query(q, values, (error, _data) => {
      if (error) return res.status(500).json(error);
      return res.json("Post has been created successfully");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("NOT authenticated!");

  jwt.verify(token, "jwtkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is NOT valid!");

    const postId = req.params.postId;

    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (error, _data) => {
      if (error) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted successfully");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authorized.");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is invalid");

    const postId = req.params.postId;

    const q =

      "UPDATE posts SET title = ?, `desc` = ?, img = ?, cat = ? WHERE id = ? AND uid = ?";
      // "UPDATE posts SET `title`= ?, `desc`= ?,`img`= ?,`cat`= ? WHERE `id`= ? AND `uid`= ?";

      const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, postId, userInfo.id];

    // const values = [req.body.title, req.body.desc, req.body.img, req.body.cat. postId, userInfo.id];

    db.query(q, values, (error, _data) => {
      if (error) return res.status(403).json(error)

    // db.query(q, [...values, postId, userInfo.id], (error, _data) => {
        // if (error) return res.status(403).json(error)
  

      return res.json("Post has been updated successfully");
    });
  });
};
