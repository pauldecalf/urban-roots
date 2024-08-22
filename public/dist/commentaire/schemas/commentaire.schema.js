"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentaireSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CommentaireSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    message: { type: String, required: true },
    publicationId: { type: String, required: true },
    commentaireId: { type: String },
    isSolution: { type: Boolean, default: false }
});
//# sourceMappingURL=commentaire.schema.js.map