import { Document } from 'mongoose';

export interface Jardins extends Document {
    readonly createdAt: Date;
    readonly createdBy: string;
    readonly nom: string;
    readonly adresse: string;
    readonly codePostal: string;
    readonly ville: string;
    readonly telephone: string;
    readonly email: string;
    readonly siteWeb: string;
    readonly facebook: string;
    readonly twitter: string;
    readonly instagram: string;
    readonly description: string;
    readonly latitude: number;
    readonly longitude: number;
    readonly image: string;
    readonly horaires: string;
    readonly tarifs: string;
    readonly acces: string;
    readonly parking: string;
    readonly accesTransport: string;
    readonly type: string;
    readonly capacite: number;
    readonly public: string;
    readonly services: string;
    readonly label: string;
    readonly note: number;
    readonly avis: string;
}
