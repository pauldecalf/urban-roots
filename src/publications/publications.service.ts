import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publications } from './interfaces/publications.interface';
import { CreatePublicationsDto } from './dto/create-publications.dto';

@Injectable()
export class PublicationsService {
    constructor(
        @InjectModel('Publications') private readonly publicationsModel: Model<Publications>,
    ) {}

    async create(createPublicationDto: CreatePublicationsDto): Promise<Publications> {
        const createdPublication = new this.publicationsModel(createPublicationDto);
        return createdPublication.save();
    }

    async findAll(): Promise<Publications[]> {
        // Utilise la méthode qui récupère également les commentaires
        return this.findAllWithComments();
    }

    async findOne(id: string): Promise<Publications> {
        const publication = await this.publicationsModel.findById(id).populate('commentaires').exec();
        if (!publication) {
            throw new NotFoundException(`Publication with ID ${id} not found`);
        }
        return publication;
    }

    async addComment(publicationId: string, commentId: unknown): Promise<Publications> {
        return this.publicationsModel.findByIdAndUpdate(
            publicationId,
            { $push: { commentaires: commentId } },
            { new: true, useFindAndModify: false }
        ).exec();
    }

    async findAllWithComments(): Promise<Publications[]> {
        return this.publicationsModel
            .find()
            .populate({
                path: 'commentaires',
                populate: {
                    path: 'createdBy',  // Populate l'utilisateur qui a créé le commentaire
                    // On récupére l'email et le imgProfil
                    select: 'prenom imgProfil',

                },
            })
            .exec();
    }

}
