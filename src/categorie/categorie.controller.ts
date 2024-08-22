import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { Categorie } from './interfaces/categorie.interface';

@Controller('Categorie')
export class CategorieController {
    constructor(private readonly publicationsService: CategorieService) {}

    @Post()
    async create(@Body() createPublicationsDto: CreateCategorieDto) {
        return this.publicationsService.create(createPublicationsDto);
    }

    @Get()
    async findAll(): Promise<Categorie[]> {
        return this.publicationsService.findAll();
    }
}
