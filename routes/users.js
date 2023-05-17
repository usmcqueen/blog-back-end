import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Ahoy Matey from user routes!!!");
  });


export default router;
