import { Controller, Get, Post, Body } from '@nestjs/common';
import { LikePublicationService } from './likePublication.service';
import { CreateLikePublicationDto } from './dto/create-likePublication.dto';
import { likePublication } from './interfaces/likePublication.interface';

@Controller('LikePublication')
export class LikePublicationController {
    constructor(private readonly likePublicationService: LikePublicationService) {}

    @Post()
    async create(@Body() createlikePublicationDto: CreateLikePublicationDto) {
        return this.likePublicationService.create(createlikePublicationDto);
    }

    @Get()
    async findAll(): Promise<likePublication[]> {
        return this.likePublicationService.findAll();
    }
}
