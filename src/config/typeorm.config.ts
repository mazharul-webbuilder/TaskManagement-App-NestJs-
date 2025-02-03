import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Like Laravel Model Class
  synchronize: true, // Auto-sync schema, useful for development
};