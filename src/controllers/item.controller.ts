import { Request, Response } from "express";
import UserService from "../services/user.service";
import ItemService from "../services/item.service";

class ItemController {
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== "string") {
                res.status(400).json({
                    success: false,
                    error: "L'ID de l'item est requis"
                });
                return;
            }

            const item = await ItemService.getById(id);
            if (!item) {
                res.status(404).json({
                    success: false,
                    error: "Item non trouvé"
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: item
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: `Erreur lors de la récupération de l'item : ${error.message}`
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { userId, name, content } = req.body;
            if (!userId || !name || !content) {
                res.status(400).json({
                    success: false,
                    error: "userId, name et content sont requis"
                });
                return;
            }

            const user = await UserService.addItem(userId, name, content);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: `Erreur lors de l'ajout d'un item : ${error.message}`
            })
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const items = await ItemService.getAll();
            res.status(200).json({
                success: true,
                data: items
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: `Erreur lors de la récupération des items : ${error.message}`
            })
        }
    }
}

export default new ItemController();