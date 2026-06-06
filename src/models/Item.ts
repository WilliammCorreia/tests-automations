import mongoose from 'mongoose';

export interface IItem {
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const ItemSchema = new mongoose.Schema<IItem>({
    name: { type: String, required: true, unique: true },
    content: { type: String, required: false, max: 1000},
}, { timestamps: true });

export default mongoose.model<IItem>('Item', ItemSchema);