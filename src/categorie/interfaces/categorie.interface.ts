import { Document } from 'mongoose';

export interface Categorie extends Document {
    readonly nom: string;
    readonly createdAt: Date;
    readonly createdBy: string;
}
