import { Request, Response } from "express";

class UserController {
    async addItem(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, content } = req.body;
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: `Erreur lors de l'ajout d'un item : ${error.message}`
            })
        }
    }
}