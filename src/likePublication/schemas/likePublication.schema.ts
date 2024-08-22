import { Schema } from 'mongoose';

export const LikePublicationSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    publicationId: { type: String },
});

