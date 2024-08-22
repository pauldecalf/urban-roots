import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie } from './interfaces/categorie.interface';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Injectable()
export class CategorieService {
    constructor(@InjectModel('Categorie') private readonly categorieModel: Model<Categorie>) {}

    async create(createPublicationDto: CreateCategorieDto): Promise<Categorie> {
        const createdPublication = new this.categorieModel(createPublicationDto);
        return createdPublication.save();
    }

    async findAll(): Promise<Categorie[]> {
        return this.categorieModel.find().exec();
    }


    async findOne(id: string): Promise<Categorie> {
        return this.categorieModel.findById(id).exec();
    }

}
