import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Req,
    Query,
    Render,
    Res, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ArticlesService } from './articles/articles.service';
import { Article } from './articles/interfaces/article.interface';
import { AuthService } from './auth.service';
import { UtilisateursService } from './utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from './utilisateurs/dto/create-utilisateur.dto';
import { JardinsService } from './jardins/jardins.service';
import { LikePublicationService } from './likePublication/likePublication.service';
import { PublicationsService } from './publications/publications.service';
import { OAuth2Client } from 'google-auth-library';
import { config } from 'dotenv';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import {Schema} from "mongoose";
import {JwtService} from "@nestjs/jwt";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {CommentaireService} from "./commentaire/commentaire.service";
import {CreateCommentaireDto} from "./commentaire/dto/create-commentaire.dto";
config();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;



@Controller()
export class AppController {
  private client: OAuth2Client;

  constructor( private readonly commentaireService: CommentaireService,
    private readonly appService: AppService,
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
    private usersService: UtilisateursService,
    private readonly jardinsService: JardinsService,
    private readonly publicationsService: PublicationsService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
               private readonly likePublicationService: LikePublicationService  // Utilisation de la minuscule ici

  ) {
    this.client = new OAuth2Client(clientId, clientSecret);
  }

    @Get()
    @Render('index')
    async getArticles(@Query('success') success: string) {
        console.log('Success message:', success); // Ajout de la ligne de log
        const articles: Article[] = await this.articlesService.findAll();
        return { articles, successMessage: success };
    }


  @Get('/contact')
  @Render('contact')
  getContact() {
    return this.appService.getContact();
  }

  @Get('/blog')
  @Render('blog')
  async getBlog(@Query('page') page: string = '1') {
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

  @Get('articles/:slugUrl')
  @Render('article')
  async getArticle(@Param('slugUrl') slugUrl: string) {
    const article: Article = await this.articlesService.findOneBySlug(slugUrl);
    const articles: Article[] = await this.articlesService.findAll();
    return { article, articles };
  }


  @Get('articles/')
  @Render('maintenance')
  getError() {}

  @Get('/maintenance')
  @Render('maintenance')
  getMaintenance() {
    return this.appService.getMaintenance();
  }

  @Get('/mentionslegales')
  @Render('mentionslegales')
  getMentionsLegales() {
    return this.appService.getMentionsLegales();
  }

  @Get('/politiqueconfidentialite')
  @Render('politiqueconfidentialite')
  getPolitiqueConfidentialite() {
    return this.appService.getPolitiqueConfidentialite();
  }

  @Get('/faq')
  @Render('faq')
  getFaq() {
    return this.appService.getFaq();
  }

@Get('/register')
@Render('register')
getInscription() {
return this.appService.getInscription();
}




    @Post('/register')
    @UseInterceptors(FileInterceptor('imgProfil', {
        storage: diskStorage({
            destination: './public/imgprofil',  // Le dossier où les fichiers seront enregistrés
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },  // Limite la taille du fichier à 5 MB
    }))
    async register(@UploadedFile() file: Express.Multer.File, @Body() createUtilisateurDto: CreateUtilisateurDto, @Res() response: Response) {
        try {
            const existingUser = await this.usersService.findOneByEmail(createUtilisateurDto.email);
            if (existingUser) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Un compte avec cet email existe déjà' });
            }

            // Hasher le mot de passe
            const hashedPassword = await this.authService.hashPassword(createUtilisateurDto.password);

            // Créer un nouvel utilisateur
            const newUser = await this.usersService.create({
                ...createUtilisateurDto,
                password: hashedPassword,
                imgProfil: `/imgprofil/${file.filename}`,  // Utiliser l'URL de l'image téléchargée
                createdAt: new Date(),
            });

            // Générer un token JWT
            const jwtPayload = {
                email: newUser.email,
                sub: newUser.id,
                prenom: newUser.prenom,
                nom: newUser.nom
            };
            const token = this.jwtService.sign(jwtPayload);

            // Envoyer le token dans un cookie HTTP only et une réponse JSON
            return response
                .cookie('jwt', token, { httpOnly: true, secure: true })
                .status(HttpStatus.CREATED)
                .json({
                    message: 'Inscription réussie',
                    user: {
                        prenom: newUser.prenom,
                        nom: newUser.nom,
                        email: newUser.email
                    }
                });

        } catch (error) {
            console.error('Error during registration:', error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre inscription' });
        }
    }



    @Post('/login')
    async login(@Body() { email, password }: { email: string, password: string }, @Res() response: Response) {
      console.log('Tentative de connexion avec email:', email);
        try {
            // Rechercher l'utilisateur par email
            const user = await this.usersService.findOneByEmail(email);

            if (!user) {
                console.error(`User not found for email: ${email}`);
                return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
            }

            // Vérifier si le mot de passe correspond
            const isPasswordMatch = await this.authService.comparePasswords(password, user.password);
            if (!isPasswordMatch) {
                console.error(`Invalid password for email: ${email}`);
                return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Email ou mot de passe incorrect' });
            }

            // Générer un token JWT
            const jwtPayload = {
                email: user.email,
                sub: user.id,
                prenom: user.prenom,
                nom: user.nom
            };
            const token = this.jwtService.sign(jwtPayload);

            // Envoyer le token dans un cookie HTTP only et une réponse JSON
            const isProduction = process.env.NODE_ENV === 'production';
            return response
                .cookie('jwt', token, { httpOnly: true, secure: isProduction })
                .status(HttpStatus.OK)
                .json({
                    message: 'Connexion réussie',
                    user: {
                        prenom: user.prenom,
                        nom: user.nom,
                        email: user.email
                    }
                });

        } catch (error) {
            console.error('Error during login:', error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion' });
        }
    }

    @Post('/login/google')
    async loginWithGoogle(@Body() body: { idToken: string }, @Res() response: Response) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: body.idToken,
                audience: clientId,
            });

            const payload = ticket.getPayload();

            if (!payload) {
                console.error('Invalid Google token');
                return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token Google invalide' });
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
            const isProduction = process.env.NODE_ENV === 'production';

            return response
                .cookie('jwt', token, { httpOnly: true, secure: isProduction })
                .status(HttpStatus.OK)
                .json({
                    message: 'Connexion réussie',
                    user: {
                        prenom: user.prenom,
                        nom: user.nom,
                        email: user.email
                    }
                });

        } catch (error) {
            console.error('Error during Google login:', error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de votre connexion avec Google' });
        }
    }



    @Get('/login')
  @Render('login')
  getLogin() {
    return this.appService.getLogin();
  }

@Get('/espace-jardinage')
@Render('espace-jardinage')
async getEspaceJardinage() {
  const jardins = await this.jardinsService.findAll();
  return { jardins: JSON.stringify(jardins) };
}



    @Get('/espace-communautaire')
    @Render('espace-communautaire')
    async getEspaceCommunautaire(@Request() req) {
        let user = null;
        const token = req.cookies?.jwt;

        if (token) {
            try {
                // Vérifie et décode le token JWT
                user = this.jwtService.verify(token);
            } catch (err) {
                // DEBUG : console.error('Error verifying JWT:', err);
                user = null;
            }
        }

        // Renvoie les informations utilisateur (null si non connecté) à la vue
        const publications = await this.publicationsService.findAll(); // Exemple de récupération des publications

        // On vérifie si l'utilisateur a pour parametre dans l'url ?success_commentaire=true
        const successCommentaire = req.query.success_commentaire === 'true';
        // If successCommentaire alors on return successCommentaire sinon on return null

        return { user, publications, successCommentaire };
    }

    @Post('/:publicationId')
    async likePublication(@Param('publicationId') publicationId: string, @Req() req, @Res() res: Response) {
        let user = null;
        const token = req.cookies?.jwt;

        console.log('Token reçu:', token);
        console.log('ID de la publication:', publicationId);

        if (!token) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        try {
            user = this.jwtService.verify(token);
        } catch (err) {
            return res.status(401).json({ message: 'Token invalide ou expiré' });
        }

        try {
            const userId = user.id;
            await this.likePublicationService.likePublication(publicationId, userId);
            return res.status(200).json({ message: 'Publication likée avec succès' });
        } catch (error) {
            console.error('Erreur lors du like:', error.message);
            return res.status(400).json({ message: error.message });
        }
    }





}