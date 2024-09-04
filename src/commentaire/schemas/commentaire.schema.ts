import { Schema } from 'mongoose';

export const CommentaireSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence à l'utilisateur
    message: { type: String, required: true },
    publicationId: { type: Schema.Types.ObjectId, ref: 'Publications', required: true },
    commentaireId: { type: Schema.Types.ObjectId, ref: 'Commentaire' },
    isSolution: { type: Boolean, default: false }
});
