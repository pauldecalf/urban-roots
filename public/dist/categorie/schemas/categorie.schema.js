"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorieSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CategorieSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    nom: { type: String, required: true },
});
//# sourceMappingURL=categorie.schema.js.map