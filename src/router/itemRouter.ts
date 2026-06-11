import express from "express";
import itemController from "../controllers/item.controller";

const router = express.Router();

router.get('/', (req, res) => {
    itemController.getAll(req, res);
});

router.get('/:id', (req, res) => {
    itemController.getById(req, res);
});

export default router;