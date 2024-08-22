import { Schema } from 'mongoose';

export const PublicationsSchema = new Schema({
    createdBy: { type: String, required: true },
    nomEditeur: { type: String },
    imageEditeur: { type: String },
    tags: { type: String },
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    idCategorie: { type: String },
    commentaires: [{ type: Schema.Types.ObjectId, ref: 'Commentaire' }],
    createdAt: { type: Date, default: Date.now }
});
