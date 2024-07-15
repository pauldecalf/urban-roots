import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JardinsService } from './jardins.service';
import { JardinsController } from './jardins.controller';
import { JardinsSchema } from './schemas/jardins.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Jardins', schema: JardinsSchema }])],
    providers: [JardinsService],
    controllers: [JardinsController],
    exports: [JardinsService] // Ajoutez cette ligne pour exporter FamillesService
})
export class JardinsModule {}
