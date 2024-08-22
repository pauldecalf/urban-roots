/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
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
