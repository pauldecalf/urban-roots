import { Document } from 'mongoose';

export interface Commentaire extends Document {
    readonly createdAt: Date;
    readonly createdBy: string;
    readonly message: string;
    readonly publicationId: string;  // Assurez-vous que publicationId est bien un string ici, mais il sera converti en ObjectId dans la base de données
    readonly commentaireId?: string; // Si c'est une réponse à un commentaire, il peut être omis
    readonly isSolution?: boolean;  // Champ optionnel pour marquer comme solution
}
