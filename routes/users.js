// import express from 'express';
// import dotenv from 'dotenv';

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Ahoy Matey from user routes!!!");
  });


module.exports = router;

// export default router;
