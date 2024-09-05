import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikePublicationService } from './likePublication.service';
import { LikePublicationController } from './likePublication.controller';
import { LikePublicationSchema } from './schemas/likePublication.schema';
import { JwtModule } from '@nestjs/jwt'; // Importer JwtModule

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'LikePublication', schema: LikePublicationSchema }]),
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Assurez-vous que la clé secrète est bien définie dans vos variables d'environnement
            signOptions: { expiresIn: '1h' }, // Définir la durée de validité du token
        }),
    ],
    providers: [LikePublicationService],
    controllers: [LikePublicationController],
    exports: [LikePublicationService],
})
export class LikePublicationModule {}
