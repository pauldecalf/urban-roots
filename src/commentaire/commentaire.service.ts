import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commentaire } from './interfaces/commentaire.interface';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';

@Injectable()
export class CommentaireService {
    constructor(@InjectModel('Commentaire') private readonly commentaireModel: Model<Commentaire>) {}

    // Méthode pour créer un nouveau commentaire
    async create(createCommentaireDto: CreateCommentaireDto): Promise<Commentaire> {
        const createdCommentaire = new this.commentaireModel(createCommentaireDto);
        return createdCommentaire.save();
    }

    // Méthode pour récupérer tous les commentaires
    async findAll(): Promise<Commentaire[]> {
        return this.commentaireModel.find().exec();
    }

    // Méthode pour récupérer un commentaire par son ID
    async findOne(id: string): Promise<Commentaire> {
        return this.commentaireModel.findById(id).exec();
    }

    // Méthode pour trouver des commentaires par publicationId
    async findByPublicationId(publicationId: string): Promise<Commentaire[]> {
        return this.commentaireModel.find({ publicationId }).exec();
    }

    // Méthode pour trouver des commentaires par publicationId avec la publication liée (si nécessaire)
    async findByPublicationIdWithPopulate(publicationId: string): Promise<Commentaire[]> {
        return this.commentaireModel.find({ publicationId }).populate('publicationId').exec();
    }
}
