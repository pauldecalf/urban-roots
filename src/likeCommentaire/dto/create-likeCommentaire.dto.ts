export class CreateLikeCommentaireDto {
    readonly createdAt: Date;
    readonly createdBy: string;
    readonly message: string;
    readonly commentaireId: string;
}
