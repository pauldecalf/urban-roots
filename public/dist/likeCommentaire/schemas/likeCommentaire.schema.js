"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeCommentaireSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LikeCommentaireSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    commentaireId: { type: String },
});
//# sourceMappingURL=likeCommentaire.schema.js.map