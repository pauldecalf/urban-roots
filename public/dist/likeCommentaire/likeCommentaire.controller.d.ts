import { LikeCommentaireService } from './likeCommentaire.service';
import { CreateLikeCommentaireDto } from './dto/create-likeCommentaire.dto';
import { likeCommentaire } from './interfaces/likeCommentaire.interface';
export declare class LikeCommentaireController {
    private readonly likeCommentaireService;
    constructor(likeCommentaireService: LikeCommentaireService);
    create(createlikeCommentaireDto: CreateLikeCommentaireDto): Promise<likeCommentaire>;
    findAll(): Promise<likeCommentaire[]>;
}
