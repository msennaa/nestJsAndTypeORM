import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModel } from '../models/person.model';
import { PersonController } from '../controllers/person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonModel])],
  controllers: [PersonController],
})
export class PersonModule {}
