import {Controller, Get, Post, Body, Param, Render, NotFoundException} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { Publications } from './interfaces/publications.interface';

@Controller('publications')
export class PublicationsController {
    constructor(private readonly publicationsService: PublicationsService) {}

    @Post()
    async create(@Body() createPublicationsDto: CreatePublicationsDto) {
        return this.publicationsService.create(createPublicationsDto);
    }

    @Get()
    async findAll(): Promise<Publications[]> {
        // Pour chacune des publication il faut récupérer les commentaires ayant pour publicationId le _id de la publication


        return this.publicationsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Publications> {
        return this.publicationsService.findOne(id);
    }

    @Get(':id')
    @Render('publication')
    async getPublication(@Param('id') id: string) {
        const publication = await this.publicationsService.findOne(id);
        if (!publication) {
            throw new NotFoundException('Publication not found');
        }
        return { publication };
    }
}
