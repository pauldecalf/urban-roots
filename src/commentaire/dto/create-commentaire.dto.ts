import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCommentaireDto {
    @IsNotEmpty()
    @IsString()
    publicationId: string;  // publicationId est une chaîne de caractères

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsOptional()
    @IsString()
    commentaireId?: string;

    @IsOptional()
    @IsBoolean()
    isSolution?: boolean;

    @IsOptional()
    @IsString()
    createdBy?: string;

    @IsOptional()
    createdAt?: Date;
}
