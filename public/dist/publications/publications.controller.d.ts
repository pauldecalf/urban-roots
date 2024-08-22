import { PublicationsService } from './publications.service';
import { CreatePublicationsDto } from './dto/create-publications.dto';
import { Publications } from './interfaces/publications.interface';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
    create(createPublicationsDto: CreatePublicationsDto): Promise<Publications>;
    findAll(): Promise<Publications[]>;
}
