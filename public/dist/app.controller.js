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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const articles_service_1 = require("./articles/articles.service");
const auth_service_1 = require("./auth.service");
const utilisateurs_service_1 = require("./utilisateurs/utilisateurs.service");
const create_utilisateur_dto_1 = require("./utilisateurs/dto/create-utilisateur.dto");
const jardins_service_1 = require("./jardins/jardins.service");
const publications_service_1 = require("./publications/publications.service");
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = require("dotenv");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
(0, dotenv_1.config)();
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
let AppController = class AppController {
    constructor(appService, articlesService, authService, usersService, jardinsService, publicationsService, configService, jwtService) {
        this.appService = appService;
        this.articlesService = articlesService;
        this.authService = authService;
        this.usersService = usersService;
        this.jardinsService = jardinsService;
        this.publicationsService = publicationsService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.client = new google_auth_library_1.OAuth2Client(clientId, clientSecret);
    }
    async getArticles(success) {
        console.log('Success message:', success);
        const articles = await this.articlesService.findAll();
        return { articles, successMessage: success };
    }
    getContact() {
        return this.appService.getContact();
    }
    async getBlog(page = '1') {
        const pageNumber = parseInt(page, 10) || 1;
        const limit = 6;
        const skip = (pageNumber - 1) * limit;
        const [articles, totalArticles] = await Promise.all([
            this.articlesService.findAllWithPagination(limit, skip),
            this.articlesService.countAll()
        ]);
        const totalPages = Math.ceil(totalArticles / limit);
        return { articles, currentPage: pageNumber, totalPages };
    }
    async getArticle(slugUrl) {
        const article = await this.articlesService.findOneBySlug(slugUrl);
        const articles = await this.articlesService.findAll();
        return { article, articles };
    }
    getError() { }
    getMaintenance() {
        return this.appService.getMaintenance();
    }
    getMentionsLegales() {
        return this.appService.getMentionsLegales();
    }
    getPolitiqueConfidentialite() {
        return this.appService.getPolitiqueConfidentialite();
    }
    getFaq() {
        return this.appService.getFaq();
    }
    getInscription() {
        return this.appService.getInscription();
    }
    async register(file, createUtilisateurDto, response) {
        try {
            const existingUser = await this.usersService.findOneByEmail(createUtilisateurDto.email);
            if (existingUser) {
                return response.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Un compte avec cet email existe déjà' });
            }
            const hashedPassword = await this.authService.hashPassword(createUtilisateurDto.password);
            const newUser = await this.usersService.create({
                ...createUtilisateurDto,
                password: hashedPassword,
                imgProfil: `/imgprofil/${file.filename}`,
                createdAt: new Date(),
            });
            const jwtPayload = {
                email: newUser.email,
                sub: newUser.id,
                prenom: newUser.prenom,
                nom: newUser.nom
            };
            const token = this.jwtService.sign(jwtPayload);
            return response
                .cookie('jwt', token, { httpOnly: true, secure: true })
                .status(common_1.HttpStatus.CREATED)
                .json({
                message: 'Inscription réussie',
                user: {
                    prenom: newUser.prenom,
                    nom: newUser.nom,
                    email: newUser.email
                }
            });
        }
        catch (error) {
            console.error('Error during registration:', error);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre inscription' });
        }
    }
    async login({ email, password }, response) {
        try {
            const user = await this.usersService.findOneByEmail(email);
            if (!user) {
                console.error('User not found');
                return response.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
            }
            const isPasswordMatch = await this.authService.comparePasswords(password, user.password);
            if (!isPasswordMatch) {
                return response.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
            }
            const jwtPayload = {
                email: user.email,
                sub: user.id,
                prenom: user.prenom,
                nom: user.nom
            };
            const token = this.jwtService.sign(jwtPayload);
            return response
                .cookie('jwt', token, { httpOnly: true, secure: true })
                .status(common_1.HttpStatus.OK)
                .json({
                message: 'Connexion réussie',
                user: {
                    prenom: user.prenom,
                    nom: user.nom,
                    email: user.email
                }
            });
        }
        catch (error) {
            console.error('Error during login:', error);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion' });
        }
    }
    async loginWithGoogle(body, response) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: body.idToken,
                audience: clientId,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                return response.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Token Google invalide' });
            }
            let user = await this.usersService.findOneByEmail(payload.email);
            if (!user) {
                const [prenom, ...rest] = payload.name.split(' ');
                const nom = rest.join(' ');
                user = await this.usersService.create({
                    genre: 'default-genre',
                    prenom: prenom,
                    nom: nom,
                    email: payload.email,
                    googleId: payload.sub,
                    imgProfil: payload.picture,
                    password: undefined,
                    createdAt: new Date(),
                });
            }
            const jwtPayload = {
                email: user.email,
                sub: user.id,
                prenom: user.prenom,
                nom: user.nom
            };
            const token = this.jwtService.sign(jwtPayload);
            const cookie = jwtPayload;
            return response
                .cookie('jwt', token, { httpOnly: true, secure: true }).status(common_1.HttpStatus.OK).json({
                message: 'Connexion réussie',
                user: {
                    prenom: user.prenom,
                    nom: user.nom,
                    email: user.email,
                }
            });
        }
        catch (error) {
            console.error('Error during Google login:', error);
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion avec Google' });
        }
    }
    getLogin() {
        return this.appService.getLogin();
    }
    async getEspaceJardinage() {
        const jardins = await this.jardinsService.findAll();
        return { jardins: JSON.stringify(jardins) };
    }
    async getEspaceCommunautaire(req) {
        let user = null;
        const token = req.cookies?.jwt;
        if (token) {
            try {
                user = this.jwtService.verify(token);
                console.log('Utilisateur décodé:', user);
            }
            catch (err) {
                console.log('Token invalide ou expiré');
            }
        }
        const publications = await this.publicationsService.findAll();
        return { user, publications };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Query)('success')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Get)('/contact'),
    (0, common_1.Render)('contact'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContact", null);
__decorate([
    (0, common_1.Get)('/blog'),
    (0, common_1.Render)('blog'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBlog", null);
__decorate([
    (0, common_1.Get)('articles/:slugUrl'),
    (0, common_1.Render)('article'),
    __param(0, (0, common_1.Param)('slugUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getArticle", null);
__decorate([
    (0, common_1.Get)('articles/'),
    (0, common_1.Render)('maintenance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getError", null);
__decorate([
    (0, common_1.Get)('/maintenance'),
    (0, common_1.Render)('maintenance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMaintenance", null);
__decorate([
    (0, common_1.Get)('/mentionslegales'),
    (0, common_1.Render)('mentionslegales'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMentionsLegales", null);
__decorate([
    (0, common_1.Get)('/politiqueconfidentialite'),
    (0, common_1.Render)('politiqueconfidentialite'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPolitiqueConfidentialite", null);
__decorate([
    (0, common_1.Get)('/faq'),
    (0, common_1.Render)('faq'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getFaq", null);
__decorate([
    (0, common_1.Get)('/register'),
    (0, common_1.Render)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getInscription", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imgProfil', {
        storage: (0, multer_1.diskStorage)({
            destination: './imgprofil',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_utilisateur_dto_1.CreateUtilisateurDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/login/google'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginWithGoogle", null);
__decorate([
    (0, common_1.Get)('/login'),
    (0, common_1.Render)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Get)('/espace-jardinage'),
    (0, common_1.Render)('espace-jardinage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getEspaceJardinage", null);
__decorate([
    (0, common_1.Get)('/espace-communautaire'),
    (0, common_1.Render)('espace-communautaire'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getEspaceCommunautaire", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        articles_service_1.ArticlesService,
        auth_service_1.AuthService,
        utilisateurs_service_1.UtilisateursService,
        jardins_service_1.JardinsService,
        publications_service_1.PublicationsService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map