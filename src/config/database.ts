import { registerAs } from "@nestjs/config";

export default registerAs('database', () =>  ({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    logging: process.env.DB_LOGGING === 'true',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
}));