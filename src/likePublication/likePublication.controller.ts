import { Controller, Get, Post, Delete, Body, Req, Res, Param } from '@nestjs/common';
import { LikePublicationService } from './likePublication.service';
import { CreateLikePublicationDto } from './dto/create-likePublication.dto';
import { likePublication } from './interfaces/likePublication.interface';
import { Request, Response } from 'express';
import {JwtService} from "@nestjs/jwt"; // Ajoutez ces imports

@Controller('LikePublication') // "LikePublication" est le préfixe de route
export class LikePublicationController {
    constructor(private readonly jwtService: JwtService,private readonly likePublicationService: LikePublicationService) {}

    @Post('/:publicationId')
    async likePublication(@Param('publicationId') publicationId: string, @Req() req: Request, @Res() res: Response) {
        let user = null;
        const token = req.cookies?.jwt; // JWT dans les cookies

        if (!token) {
            return res.status(401).json({ message: 'Utilisateur non authentifié' });
        }

        try {
            // Décode le token JWT
            user = this.jwtService.verify(token);
        } catch (err) {
            return res.status(401).json({ message: 'Token invalide ou expiré' });
        }

        try {
            const userId = user.id; // Récupérer l'ID de l'utilisateur depuis le JWT déchiffré
            await this.likePublicationService.likePublication(publicationId, userId);
            return res.status(200).json({ message: 'Publication likée avec succès' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

