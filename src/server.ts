import { Request, Response } from "express";

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const UserService = require('./services/user.service');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

app.get('/ping', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'pong' });
});

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`);
});

(async () => {
  const res = await UserService.addItem("6a23f827d02f2bc198d215b9", "< 30 min", "Spurs in 6 !");
  console.log("res : ", res);
})()