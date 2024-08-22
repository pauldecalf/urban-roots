import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { CategorieSchema } from './schemas/categorie.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Categorie', schema: CategorieSchema }])],
    providers: [CategorieService],
    controllers: [CategorieController],
    exports: [CategorieService]
})
export class CategorieModule {}
