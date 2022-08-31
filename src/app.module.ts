import 'dotenv/config';
import { Module } from '@nestjs/common';
import { PersonModule } from './modules/person.modules';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'nextjs',
      entities: ['dist/**/*.model.js'],
    }),
  ],
})
export class AppModule {}
