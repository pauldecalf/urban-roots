import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { likePublication } from './interfaces/likePublication.interface';

@Injectable()
export class LikePublicationService {
    constructor(
        @InjectModel('LikePublication') private readonly likeModel: Model<likePublication>,
    ) {}

    async likePublication(publicationId: string, userId: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(publicationId)) {
            throw new Error('ID de publication invalide');
        }

        const existingLike = await this.likeModel.findOne({ publicationId, createdBy: userId });

        if (existingLike) {
            throw new Error('Vous avez déjà liké cette publication.');
        }

        const newLike = new this.likeModel({
            publicationId,
            createdBy: userId,
            createdAt: new Date(),
        });

        await newLike.save();
    }

    async unlikePublication(publicationId: string, userId: string): Promise<void> {
        const like = await this.likeModel.findOneAndDelete({ publicationId, createdBy: userId });
        if (!like) {
            throw new Error('Like introuvable.');
        }
    }

    // Cette méthode permet de vérifier si un utilisateur a liké une publication
    async hasLiked(publicationId, userId) {
        try {
            const like = await this.likeModel.findOne({ publicationId, userId });
            return !!like; // Retourne true si un like existe, sinon false
        } catch (error) {
            console.error('Erreur dans hasLiked:', error);
            return null; // Retourne null en cas d'erreur
        }
    }

}

