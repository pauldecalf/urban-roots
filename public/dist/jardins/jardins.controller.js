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
exports.JardinsController = void 0;
const common_1 = require("@nestjs/common");
const jardins_service_1 = require("./jardins.service");
const jardins_dto_1 = require("./dto/jardins.dto");
let JardinsController = class JardinsController {
    constructor(jardinsService) {
        this.jardinsService = jardinsService;
    }
    async create(createJardinsDto) {
        return this.jardinsService.create(createJardinsDto);
    }
    async findAll() {
        return this.jardinsService.findAll();
    }
};
exports.JardinsController = JardinsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jardins_dto_1.CreateJardinsDto]),
    __metadata("design:returntype", Promise)
], JardinsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JardinsController.prototype, "findAll", null);
exports.JardinsController = JardinsController = __decorate([
    (0, common_1.Controller)('jardins'),
    __metadata("design:paramtypes", [jardins_service_1.JardinsService])
], JardinsController);
//# sourceMappingURL=jardins.controller.js.map