import express from "express";
import userRouter from "./userRouter";
import itemRouter from "./itemRouter";

const router = express.Router();

router.use("/users", userRouter);
router.use("/items", itemRouter);

export default router;