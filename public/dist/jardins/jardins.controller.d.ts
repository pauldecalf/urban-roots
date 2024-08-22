import { JardinsService } from './jardins.service';
import { CreateJardinsDto } from './dto/jardins.dto';
import { Jardins } from "./interfaces/jardins.interface";
export declare class JardinsController {
    private readonly jardinsService;
    constructor(jardinsService: JardinsService);
    create(createJardinsDto: CreateJardinsDto): Promise<Jardins>;
    findAll(): Promise<Jardins[]>;
}
