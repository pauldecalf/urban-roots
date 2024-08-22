import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { Categorie } from './interfaces/categorie.interface';
export declare class CategorieController {
    private readonly publicationsService;
    constructor(publicationsService: CategorieService);
    create(createPublicationsDto: CreateCategorieDto): Promise<Categorie>;
    findAll(): Promise<Categorie[]>;
}
