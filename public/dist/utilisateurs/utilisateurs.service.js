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
exports.UtilisateursService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UtilisateursService = class UtilisateursService {
    constructor(utilisateurModel) {
        this.utilisateurModel = utilisateurModel;
    }
    async create(createUtilisateurDto) {
        const createdUtilisateur = new this.utilisateurModel(createUtilisateurDto);
        return createdUtilisateur.save();
    }
    async findAll() {
        return this.utilisateurModel.find().exec();
    }
    async countAll() {
        return this.utilisateurModel.countDocuments().exec();
    }
    async findOne(id) {
        return this.utilisateurModel.findById(id).exec();
    }
    async findOneByEmail(email) {
        return this.utilisateurModel.findOne({ email }).exec();
    }
    async update(id, user) {
        return this.utilisateurModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }
};
exports.UtilisateursService = UtilisateursService;
exports.UtilisateursService = UtilisateursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Utilisateur')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UtilisateursService);
//# sourceMappingURL=utilisateurs.service.js.map