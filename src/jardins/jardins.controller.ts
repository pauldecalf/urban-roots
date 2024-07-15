import { Controller, Get, Post, Body } from '@nestjs/common';
import { JardinsService } from './jardins.service';
import { CreateJardinsDto } from './dto/jardins.dto';
import { Jardins } from "./interfaces/jardins.interface";
import { JardinsSchema } from "./schemas/jardins.schema";

@Controller('jardins')
export class JardinsController {
    constructor(private readonly jardinsService: JardinsService) {}

    @Post()
    async create(@Body() createJardinsDto: CreateJardinsDto) {
        return this.jardinsService.create(createJardinsDto);
    }

    @Get()
    async findAll(): Promise<Jardins[]> {
        return this.jardinsService.findAll();
    }
}
