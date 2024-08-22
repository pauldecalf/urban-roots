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
exports.PublicationsController = void 0;
const common_1 = require("@nestjs/common");
const publications_service_1 = require("./publications.service");
const create_publications_dto_1 = require("./dto/create-publications.dto");
let PublicationsController = class PublicationsController {
    constructor(publicationsService) {
        this.publicationsService = publicationsService;
    }
    async create(createPublicationsDto) {
        return this.publicationsService.create(createPublicationsDto);
    }
    async findAll() {
        return this.publicationsService.findAll();
    }
};
exports.PublicationsController = PublicationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_publications_dto_1.CreatePublicationsDto]),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicationsController.prototype, "findAll", null);
exports.PublicationsController = PublicationsController = __decorate([
    (0, common_1.Controller)('publications'),
    __metadata("design:paramtypes", [publications_service_1.PublicationsService])
], PublicationsController);
//# sourceMappingURL=publications.controller.js.map