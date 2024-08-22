"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UtilisateurSchema = new mongoose_1.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    imgProfil: { type: String, required: true },
    genre: { type: String, required: true },
    googleId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=utilisateur.schema.js.map