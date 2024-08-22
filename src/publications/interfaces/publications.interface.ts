import { Document } from 'mongoose';

export interface Publications extends Document {
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
