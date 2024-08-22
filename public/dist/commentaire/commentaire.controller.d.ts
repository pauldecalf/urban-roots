import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { Commentaire } from './interfaces/commentaire.interface';
export declare class CommentaireController {
    private readonly publicationsService;
    constructor(publicationsService: CommentaireService);
    create(createPublicationsDto: CreateCommentaireDto): Promise<Commentaire>;
    findAll(): Promise<Commentaire[]>;
}
