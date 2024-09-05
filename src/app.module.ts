import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from "@nestjs/mongoose";
import { ArticlesModule } from './articles/articles.module';
import { UtilisateursModule } from "./utilisateurs/utilisateurs.module";
import { LikePublicationModule } from './likePublication/likePublication.module';
import { PublicationsModule } from "./publications/publications.module";
import { CommentaireModule } from "./commentaire/commentaire.module";  // Import du module des commentaires
import { LikeCommentaireModule } from "./likeCommentaire/likeCommentaire.module";
import { CategorieModule } from "./categorie/categorie.module";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as cookieParser from 'cookie-parser';
import { JardinsModule } from './jardins/jardins.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from "./jwt.strategy";
import { UploadModule } from "./upload/upload.module";
import { join } from 'path';  // Assurez-vous que l'import de `join` est présent ici

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    MongooseModule.forRoot('mongodb+srv://admin:admin@atlascluster.vfolo9m.mongodb.net/UrbanRoot'),
    ArticlesModule,
    UtilisateursModule,
    JardinsModule,
    PublicationsModule,
    LikePublicationModule,
    CommentaireModule,
    LikeCommentaireModule,
    LikePublicationModule,
    CategorieModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(cookieParser())  // Utilisation correcte de `apply`
        .forRoutes('*'); // Applique le middleware à toutes les routes
  }
}
