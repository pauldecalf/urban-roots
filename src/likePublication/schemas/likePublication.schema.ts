import { Schema } from 'mongoose';

export const LikePublicationSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence à l'utilisateur
    publicationId: { type: Schema.Types.ObjectId, ref: 'Publications', required: true }, // Référence à la publication
});
