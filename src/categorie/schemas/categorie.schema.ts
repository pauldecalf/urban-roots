import { Schema } from 'mongoose';

export const CategorieSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    nom: { type: String, required: true },
});

