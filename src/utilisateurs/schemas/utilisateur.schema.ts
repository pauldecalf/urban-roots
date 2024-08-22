import { Schema } from 'mongoose';

export const UtilisateurSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    imgProfil: { type: String, required: true },
    genre: { type: String, required: true },
    googleId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});
