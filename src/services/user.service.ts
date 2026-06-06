import { lessThan30min } from "../utils/date.util";
const User = require("../models/User");
const itemService = require("../services/item.service");

class UserService {
    async addItem(userId: string, name: string, content: string): Promise<typeof User> {
        const user = await User.findById(userId).populate("Item");  
        const todoList: Array<any> = user.todoList;
        const index: number = todoList.length;

        if (!lessThan30min(todoList[index].createdAt)) {
            throw new Error("Le dernière item créé il y a moins de 30 minutes");
        }

        if (todoList.length >= 10) throw new Error("La todo list à plus de 10 items");

        const item = await itemService.create(name, content);
        todoList.push(item);

        return await user.updateOne({ todoList });
    }
}

module.exports = new UserService();