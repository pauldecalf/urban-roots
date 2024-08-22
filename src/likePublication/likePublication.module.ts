import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikePublicationService } from './likePublication.service';
import { LikePublicationController } from './likePublication.controller';
import { LikePublicationSchema } from './schemas/likePublication.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'likePublication', schema: LikePublicationSchema }])],
    providers: [LikePublicationService],
    controllers: [LikePublicationController],
    exports: [LikePublicationService]
})
export class LikePublicationModule {}
