import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './interfaces/article.interface';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
}
