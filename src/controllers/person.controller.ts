import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonSchema } from '../schemas/person.schema';
import { Repository } from 'typeorm';
import { PersonModel } from '../models/person.model';

@Controller('/person')
export class PersonController {
  constructor(
    @InjectRepository(PersonModel) private model: Repository<PersonModel>,
  ) {}

  @Post()
  public async create(@Body() body: PersonSchema): Promise<PersonModel> {
    const alreadyExists = await this.model.findOne({
      where: { email: body.email },
    });

    if (alreadyExists) {
      throw new BadRequestException('User already exists');
    }
    const personCreated = await this.model.save(body);

    return personCreated;
  }

  @Get()
  public async getAll(): Promise<PersonModel[]> {
    const people = await this.model.find();
    return people;
  }

  @Get(':id')
  public async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException('User not found');
    }
    return person;
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: PersonSchema,
  ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } });
    if (!person) {
      throw new NotFoundException('User not found');
    }

    await this.model.update({ id }, body);

    return await this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const person = await this.model.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException('User not found');
    }

    await this.model.delete(id);

    return 'User was deleted!!';
  }
}
