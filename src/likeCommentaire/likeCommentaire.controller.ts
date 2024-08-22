import { Controller, Get, Post, Body } from '@nestjs/common';
import { LikeCommentaireService } from './likeCommentaire.service';
import { CreateLikeCommentaireDto } from './dto/create-likeCommentaire.dto';
import { likeCommentaire } from './interfaces/likeCommentaire.interface';

@Controller('LikeCommentaire')
export class LikeCommentaireController {
    constructor(private readonly likeCommentaireService: LikeCommentaireService) {}

    @Post()
    async create(@Body() createlikeCommentaireDto: CreateLikeCommentaireDto) {
        return this.likeCommentaireService.create(createlikeCommentaireDto);
    }

    @Get()
    async findAll(): Promise<likeCommentaire[]> {
        return this.likeCommentaireService.findAll();
    }
}
