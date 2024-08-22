import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { likePublication } from './interfaces/likePublication.interface';
import { CreateLikePublicationDto } from './dto/create-likePublication.dto';

@Injectable()
export class LikePublicationService {
    constructor(@InjectModel('likePublication') private readonly likePublicationModel: Model<likePublication>) {}

    async create(createlikePublicationDto: CreateLikePublicationDto): Promise<likePublication> {
        const createdlikePublication = new this.likePublicationModel(createlikePublicationDto);
        return createdlikePublication.save();
    }

    async findAll(): Promise<likePublication[]> {
        return this.likePublicationModel.find().exec();
    }


    async findOne(id: string): Promise<likePublication> {
        return this.likePublicationModel.findById(id).exec();
    }

}
