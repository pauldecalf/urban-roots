import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jardins } from "./interfaces/jardins.interface";
import { CreateJardinsDto } from './dto/jardins.dto';
import { JardinsSchema } from "./schemas/jardins.schema";

@Injectable()
export class JardinsService {
    constructor(@InjectModel('Jardins') private readonly jardinsModel: Model<Jardins>) {}

    async create(createJardinsDto: CreateJardinsDto): Promise<Jardins> {
        const createdJardins = new this.jardinsModel(createJardinsDto);
        return createdJardins.save();
    }

    async findAll(): Promise<Jardins[]> {
        return this.jardinsModel.find().exec();
    }

    async countAll(): Promise<number> {
        return this.jardinsModel.countDocuments().exec();
    }

    async findOne(id: string): Promise<Jardins> {
        return this.jardinsModel.findById(id).exec();
    }
}
