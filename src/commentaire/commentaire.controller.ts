import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { CommentaireService } from './commentaire.service';
import { PublicationsService } from '../publications/publications.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

const isValidObjectId = (id: string): boolean => Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);

@Controller('commentaire')
export class CommentaireController {
    constructor(
        private readonly commentaireService: CommentaireService,
        private readonly publicationsService: PublicationsService,
        private readonly jwtService: JwtService
    ) {}

    @Post('/comment')
    async postComment(
        @Body() createCommentaireDto: CreateCommentaireDto,
        @Req() req: Request,
        @Res() response: Response,
    ) {
        try {
            const cookies = (req as any).cookies;
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvcmlsbGVtb2QxMjRAZ21haWwuY29tIiwic3ViIjoiNjZjNWFiZmZiOTAxMjM2ODViNzFlM2JiIiwicHJlbm9tIjoiUGF1bCIsIm5vbSI6IkRlY2FsZiIsImlhdCI6MTcyNDMyNzM0MiwiZXhwIjoxNzI0MzMwOTQyfQ.WJ4pAZHK2WSy5y4b2-XB7amf6GyTiBa89tbl-KXyJQQ";
            if (!token) {
                return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Vous devez être connecté pour poster un commentaire.' });
            }

            let decoded;
            try {
                decoded = this.jwtService.verify(token);
            } catch (err) {
                return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token invalide ou expiré.' });
            }

            createCommentaireDto.createdBy = decoded.sub;
            createCommentaireDto.createdAt = new Date();

            // Vérifiez que le message est présent
            if (!createCommentaireDto.message) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Le champ "message" est requis.' });
            }

            if (createCommentaireDto.publicationId && !isValidObjectId(createCommentaireDto.publicationId)) {
                return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid publicationId format' });
            }

            const commentaire = await this.commentaireService.create(createCommentaireDto);
            await this.publicationsService.addComment(createCommentaireDto.publicationId, commentaire._id);
            console.log('Commentaire:', commentaire);
            console.log('Created At:', new Date(commentaire.createdAt));

            return response.status(HttpStatus.CREATED).json({ message: 'Commentaire posté avec succès.' });
        } catch (error) {
            console.error('Error posting comment:', error);
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Une erreur est survenue lors de la soumission du commentaire.' });
        }
    }

}
