import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.get('/regression', (req, res) => {
    userController.getAll(req, res);
});

router.post('/', (req, res) => {
    userController.create(req, res);
});

router.post('/item', (req, res) => {
    userController.addItem(req, res);
});

export default router;