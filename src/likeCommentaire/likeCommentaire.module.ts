import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeCommentaireService } from './likeCommentaire.service';
import { LikeCommentaireController } from './likeCommentaire.controller';
import { LikeCommentaireSchema } from './schemas/likeCommentaire.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'LikeCommentaire', schema: LikeCommentaireSchema }])],
    providers: [LikeCommentaireService],
    controllers: [LikeCommentaireController],
    exports: [LikeCommentaireService]
})
export class LikeCommentaireModule {}
