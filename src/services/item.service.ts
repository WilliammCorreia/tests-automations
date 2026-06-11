import Item from "../models/Item";
import { IItem } from "../models/Item";

class ItemService {
    async getById(id: string): Promise<IItem | null> {
        return await Item.findById(id);
    }

    async create(name: string, content: string): Promise<IItem> {
        if (content.length > 1000) throw new Error("Le contenu fait plus de 1000 caractères");

        const item = await Item.findOne({ name });
        if (item) throw new Error("L'item existe déjà");

        const newItem = new Item({ name, content });

        return await newItem.save();
    }

    async getAll(): Promise<IItem[]> {
        return await Item.find();
    }
}

export default new ItemService();