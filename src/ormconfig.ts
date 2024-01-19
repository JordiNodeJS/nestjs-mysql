import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  port: 3306,
  database: 'nestjs_course',
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // charges all entities
  synchronize: true, // auto update -> it should be false in production❗
};
