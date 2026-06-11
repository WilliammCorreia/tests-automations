import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserService.getAll();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: `Erreur lors de la récupération des utilisateurs : ${error.message}`
            })
        }
    }

    async addItem(req: Request, res: Response): Promise<void> {
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

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { email, lastname, firstname, password, birthDate } = req.body;
            if (!email || !lastname || !firstname || !password || !birthDate) {
                res.status(400).json({
                    success: false,
                    error: "email, lastname, firstname, password et birthDate sont requis"
                });
                return;
            }

            const existingUser = await UserService.getByEmail(email);
            if (existingUser) {
                res.status(400).json({
                    success: false,
                    error: "Cet email est déjà utilisé"
                });
                return;
            }

            const user = await UserService.create(email, lastname, firstname, password, birthDate);
            res.status(201).json({
                success: true,
                data: user
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: `Erreur lors de la création d'un utilisateur : ${error.message}`
            })
        }
    }
}

export default new UserController();