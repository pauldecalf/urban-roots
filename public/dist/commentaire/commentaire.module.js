"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentaireModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const commentaire_service_1 = require("./commentaire.service");
const commentaire_controller_1 = require("./commentaire.controller");
const commentaire_schema_1 = require("./schemas/commentaire.schema");
let CommentaireModule = class CommentaireModule {
};
exports.CommentaireModule = CommentaireModule;
exports.CommentaireModule = CommentaireModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Commentaire', schema: commentaire_schema_1.CommentaireSchema }])],
        providers: [commentaire_service_1.CommentaireService],
        controllers: [commentaire_controller_1.CommentaireController],
        exports: [commentaire_service_1.CommentaireService]
    })
], CommentaireModule);
//# sourceMappingURL=commentaire.module.js.map