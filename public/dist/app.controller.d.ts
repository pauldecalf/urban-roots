/// <reference types="multer" />
import { Response } from 'express';
import { AppService } from './app.service';
import { ArticlesService } from './articles/articles.service';
import { Article } from './articles/interfaces/article.interface';
import { AuthService } from './auth.service';
import { UtilisateursService } from './utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
import { JardinsService } from './jardins/jardins.service';
import { PublicationsService } from './publications/publications.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from "@nestjs/jwt";
export declare class AppController {
    private readonly appService;
    private readonly articlesService;
    private readonly authService;
    private usersService;
    private readonly jardinsService;
    private readonly publicationsService;
    private configService;
    private readonly jwtService;
    private client;
    constructor(appService: AppService, articlesService: ArticlesService, authService: AuthService, usersService: UtilisateursService, jardinsService: JardinsService, publicationsService: PublicationsService, configService: ConfigService, jwtService: JwtService);
    getArticles(success: string): Promise<{
        articles: Article[];
        successMessage: string;
    }>;
    getContact(): void;
    getBlog(page?: string): Promise<{
        articles: Article[];
        currentPage: number;
        totalPages: number;
    }>;
    getArticle(slugUrl: string): Promise<{
        article: Article;
        articles: Article[];
    }>;
    getError(): void;
    getMaintenance(): void;
    getMentionsLegales(): void;
    getPolitiqueConfidentialite(): void;
    getFaq(): void;
    getInscription(): void;
    register(file: Express.Multer.File, createUtilisateurDto: CreateUtilisateurDto, response: Response): Promise<Response<any, Record<string, any>>>;
    login({ email, password }: {
        email: string;
        password: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    loginWithGoogle(body: {
        idToken: string;
    }, response: Response): Promise<Response<any, Record<string, any>>>;
    getLogin(): void;
    getEspaceJardinage(): Promise<{
        jardins: string;
    }>;
    getEspaceCommunautaire(req: any): Promise<{
        user: any;
        publications: import("./publications/interfaces/publications.interface").Publications[];
    }>;
}
