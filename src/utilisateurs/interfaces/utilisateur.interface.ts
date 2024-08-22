import { Document } from 'mongoose';

export interface Utilisateur extends Document {
     nom: string;
     prenom: string;
     email: string;
     password?: string;
     imgProfil: string;
     genre: string;
     googleId?: string;
     createdAt: Date;
}
