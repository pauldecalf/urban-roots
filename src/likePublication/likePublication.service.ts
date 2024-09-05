import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { likePublication } from './interfaces/likePublication.interface';

@Injectable()
export class LikePublicationService {
    constructor(
        @InjectModel('LikePublication') private readonly likeModel: Model<likePublication>,
    ) {}

    async likePublication(publicationId: string, userId: string): Promise<likePublication> {
        const existingLike = await this.likeModel.findOne({ publicationId, createdBy: userId });

        if (existingLike) {
            throw new Error('Vous avez déjà liké cette publication.');
        }

        const newLike = new this.likeModel({
            publicationId,
            createdBy: userId,
            createdAt: new Date(),
        });

        return newLike.save();
    }


    async unlikePublication(publicationId: string, userId: string): Promise<void> {
        const like = await this.likeModel.findOneAndDelete({ publicationId, createdBy: userId });
        if (!like) {
            throw new Error('Like introuvable.');
        }
    }
}
