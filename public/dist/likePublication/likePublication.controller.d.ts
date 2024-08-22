import { LikePublicationService } from './likePublication.service';
import { CreateLikePublicationDto } from './dto/create-likePublication.dto';
import { likePublication } from './interfaces/likePublication.interface';
export declare class LikePublicationController {
    private readonly likePublicationService;
    constructor(likePublicationService: LikePublicationService);
    create(createlikePublicationDto: CreateLikePublicationDto): Promise<likePublication>;
    findAll(): Promise<likePublication[]>;
}
