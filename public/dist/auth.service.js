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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(configService, jwtService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.saltRounds = 10;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }
    async comparePasswords(password, storedPasswordHash) {
        return bcrypt.compare(password, storedPasswordHash);
    }
    async generateToken(user) {
        const payload = { sub: user._id, email: user.email };
        return this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '1h',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map