export class CreatePublicationsDto {
    readonly createdBy: string;
    readonly nomEditeur: string;
    readonly imageEditeur: string;
    readonly createdAt: Date;
    readonly tags: string;
    readonly titre: string;
    readonly contenu: string;
    readonly idCategorie: string;
    readonly commentaires: string[];

}
