const Item = require("../models/Item");

class ItemService {
    async create(name: string, content: string): Promise<typeof Item> {
        if (content.length > 1000) throw new Error("Le contenu fait plus de 1000 caractères");

        const item = await Item.first({ name });
        if (item) throw new Error("L'item existe déjà");

        const newItem = new Item({ name, content });

        return await newItem.save();
    }
}

module.exports = new ItemService();