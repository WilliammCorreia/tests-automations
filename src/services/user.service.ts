import { lessThan30min } from "../utils/date.util";
import { IItem } from "../models/Item";
import { IUser } from "../models/User";
import User from "../models/User";
import emailSenderService from "./emailSender.service";
import itemService from "../services/item.service";

class UserService {
    async addItem(userId: string, name: string, content: string): Promise<IUser> {
        const user = await User.findById(userId).populate("todoList");
        if (!user || !user.todoList) throw new Error("L'utilisateur n'existe pas");

        const todoList: Array<IItem> = user.todoList;
        const index: number = todoList.length;

        // Si il y a déjà un item dans la todo list, on vérifie que le dernier item a été créé il y a plus de 30 minutes
        if (index > 0) {
            const lastItem: IItem | undefined = todoList[index - 1];
            if (lessThan30min(lastItem!.createdAt)) {
                throw new Error("Le dernière item a été créé il y a moins de 30 minutes");
            }
        }

        if (todoList.length >= 10) throw new Error("La todo list à plus de 10 items");

        if (todoList.length === 7) {
            await emailSenderService.sendEmail(user.email, "Votre todo list est presque pleine !");
        }

        const item = await itemService.create(name, content);
        todoList.push(item);

        user.todoList = todoList;
        return await user.save();
    };
}

export default new UserService();