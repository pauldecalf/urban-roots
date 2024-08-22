import { Document } from 'mongoose';

export interface likeCommentaire extends Document {
    readonly createdAt: Date;
    readonly createdBy: string;
    readonly commentaireId: string; // Si réponse a un commentaire
}
