"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PublicationsSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    nomEditeur: { type: String, required: true },
    imageEditeur: { type: String, required: true },
    tags: { type: String, required: false },
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    idCategorie: { type: String, required: true },
});
//# sourceMappingURL=publications.schema.js.map