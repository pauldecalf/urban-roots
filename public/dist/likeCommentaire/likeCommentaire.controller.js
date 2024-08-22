"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeCommentaireController = void 0;
const common_1 = require("@nestjs/common");
const likeCommentaire_service_1 = require("./likeCommentaire.service");
const create_likeCommentaire_dto_1 = require("./dto/create-likeCommentaire.dto");
let LikeCommentaireController = class LikeCommentaireController {
    constructor(likeCommentaireService) {
        this.likeCommentaireService = likeCommentaireService;
    }
    async create(createlikeCommentaireDto) {
        return this.likeCommentaireService.create(createlikeCommentaireDto);
    }
    async findAll() {
        return this.likeCommentaireService.findAll();
    }
};
exports.LikeCommentaireController = LikeCommentaireController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_likeCommentaire_dto_1.CreateLikeCommentaireDto]),
    __metadata("design:returntype", Promise)
], LikeCommentaireController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeCommentaireController.prototype, "findAll", null);
exports.LikeCommentaireController = LikeCommentaireController = __decorate([
    (0, common_1.Controller)('LikeCommentaire'),
    __metadata("design:paramtypes", [likeCommentaire_service_1.LikeCommentaireService])
], LikeCommentaireController);
//# sourceMappingURL=likeCommentaire.controller.js.map