import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Ahoy Matey from user routes!!!");
  });


export default router;
