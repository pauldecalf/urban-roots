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
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ArticlesService = class ArticlesService {
    constructor(articleModel) {
        this.articleModel = articleModel;
    }
    async create(createArticleDto) {
        const createdArticle = new this.articleModel(createArticleDto);
        return createdArticle.save();
    }
    async findAll() {
        return this.articleModel.find().exec();
    }
    async findAllWithPagination(limit, skip) {
        return this.articleModel.find().limit(limit).skip(skip).exec();
    }
    async countAll() {
        return this.articleModel.countDocuments().exec();
    }
    async findOne(id) {
        return this.articleModel.findById(id).exec();
    }
    async findOneBySlug(slugUrl) {
        return this.articleModel.findOne({ slugUrl }).exec();
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Article')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map