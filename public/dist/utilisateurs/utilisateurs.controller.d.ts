import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { Utilisateur } from "./interfaces/utilisateur.interface";
export declare class UtilisateursController {
    private readonly utilisateurService;
    constructor(utilisateurService: UtilisateursService);
    create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur>;
    findAll(): Promise<Utilisateur[]>;
}
