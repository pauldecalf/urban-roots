import { Schema } from 'mongoose';

export const LikeCommentaireSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    commentaireId: { type: String },
});

