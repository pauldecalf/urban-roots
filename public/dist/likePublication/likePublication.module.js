"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikePublicationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const likePublication_service_1 = require("./likePublication.service");
const likePublication_controller_1 = require("./likePublication.controller");
const likePublication_schema_1 = require("./schemas/likePublication.schema");
let LikePublicationModule = class LikePublicationModule {
};
exports.LikePublicationModule = LikePublicationModule;
exports.LikePublicationModule = LikePublicationModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'likePublication', schema: likePublication_schema_1.LikePublicationSchema }])],
        providers: [likePublication_service_1.LikePublicationService],
        controllers: [likePublication_controller_1.LikePublicationController],
        exports: [likePublication_service_1.LikePublicationService]
    })
], LikePublicationModule);
//# sourceMappingURL=likePublication.module.js.map