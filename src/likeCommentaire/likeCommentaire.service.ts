import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { likeCommentaire } from './interfaces/likeCommentaire.interface';
import { CreateLikeCommentaireDto } from './dto/create-likeCommentaire.dto';

@Injectable()
export class LikeCommentaireService {
    constructor(@InjectModel('LikeCommentaire') private readonly likeCommentaireModel: Model<likeCommentaire>) {}

    async create(createlikeCommentaireDto: CreateLikeCommentaireDto): Promise<likeCommentaire> {
        const createdlikeCommentaire = new this.likeCommentaireModel(createlikeCommentaireDto);
        return createdlikeCommentaire.save();
    }

    async findAll(): Promise<likeCommentaire[]> {
        return this.likeCommentaireModel.find().exec();
    }


    async findOne(id: string): Promise<likeCommentaire> {
        return this.likeCommentaireModel.findById(id).exec();
    }

}
