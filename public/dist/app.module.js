"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const path_1 = require("path");
const app_service_1 = require("./app.service");
const serve_static_1 = require("@nestjs/serve-static");
const mongoose_1 = require("@nestjs/mongoose");
const articles_module_1 = require("./articles/articles.module");
const utilisateurs_module_1 = require("./utilisateurs/utilisateurs.module");
const publications_module_1 = require("./publications/publications.module");
const likePublication_module_1 = require("./likePublication/likePublication.module");
const commentaire_module_1 = require("./commentaire/commentaire.module");
const likeCommentaire_module_1 = require("./likeCommentaire/likeCommentaire.module");
const categorie_module_1 = require("./categorie/categorie.module");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const cookieParser = require("cookie-parser");
const jardins_module_1 = require("./jardins/jardins.module");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const upload_module_1 = require("./upload/upload.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(cookieParser())
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/',
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/UrbanRoot'),
            articles_module_1.ArticlesModule,
            utilisateurs_module_1.UtilisateursModule,
            jardins_module_1.JardinsModule,
            publications_module_1.PublicationsModule,
            likeCommentaire_module_1.LikeCommentaireModule,
            likePublication_module_1.LikePublicationModule,
            commentaire_module_1.CommentaireModule,
            categorie_module_1.CategorieModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            upload_module_1.UploadModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'default-secret',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_service_1.AuthService, jwt_auth_guard_1.JwtAuthGuard, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map