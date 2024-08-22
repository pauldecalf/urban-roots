export class CreateUtilisateurDto {
     nom: string;
     prenom: string;
     email: string;
     password?: string;
     imgProfil: string;
     genre: string;
     googleId?: string;
     createdAt: Date;
}
