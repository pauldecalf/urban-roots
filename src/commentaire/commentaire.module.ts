import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { CommentaireSchema } from './schemas/commentaire.schema';
import { PublicationsModule } from '../publications/publications.module';  // Import du module
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Commentaire', schema: CommentaireSchema }]),

        PublicationsModule,  // Import du module des publications pour accéder au service
        JwtModule.register({
            secret: 'JWT_SECRET',  // Remplacez par votre clé secrète JWT
            signOptions: { expiresIn: '1h' },  // Optionnel, définit la durée de validité du JWT
        }),
    ],
    providers: [CommentaireService],
    controllers: [CommentaireController],
    exports: [CommentaireService],  // Assurez-vous que le service est exporté
})
export class CommentaireModule {}
