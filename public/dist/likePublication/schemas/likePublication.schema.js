"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePublicationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LikePublicationSchema = new mongoose_1.Schema({
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
    publicationId: { type: String },
});
//# sourceMappingURL=likePublication.schema.js.map