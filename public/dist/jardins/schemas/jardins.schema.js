"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JardinsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.JardinsSchema = new mongoose_1.Schema({
    nom: { type: String, required: true },
    adresse: { type: String, required: true },
    codePostal: { type: String, required: true },
    ville: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    siteWeb: { type: String, required: true },
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
    instagram: { type: String, required: true },
    description: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    image: { type: String, required: true },
    horaires: { type: String, required: true },
    tarifs: { type: String, required: true },
    acces: { type: String, required: true },
    parking: { type: String, required: true },
    accesTransport: { type: String, required: true },
    type: { type: String, required: true },
    capacite: { type: Number, required: true },
    public: { type: String, required: true },
    services: { type: String, required: true },
    label: { type: String, required: true },
    note: { type: Number, required: true },
    avis: { type: String, required: true },
});
//# sourceMappingURL=jardins.schema.js.map