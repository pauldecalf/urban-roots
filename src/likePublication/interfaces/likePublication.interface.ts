import { Document } from 'mongoose';

export interface likePublication extends Document {
    readonly createdAt: Date;
    readonly createdBy: string;
    readonly publicationId: string;
}
