"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ArticleSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    intro: { type: String, required: true },
    content: { type: String, required: true },
    slugUrl: { type: String, required: true },
    img: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    category: { type: String, required: true },
    titlepage: { type: String, required: true },
    metadescription: { type: String, required: true },
});
//# sourceMappingURL=article.schema.js.map