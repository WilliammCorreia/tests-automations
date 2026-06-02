import { Request, Response } from "express";

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

app.get('/ping', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'pong' });
});

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`);
});     