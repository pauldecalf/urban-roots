import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsSchema } from './schemas/publications.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Publications', schema: PublicationsSchema }]),
    ],
    providers: [PublicationsService],
    controllers: [PublicationsController],
    exports: [PublicationsService],  // Export du service
})
export class PublicationsModule {}
