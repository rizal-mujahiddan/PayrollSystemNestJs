import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database/databasepayroll.sqlite',
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/database/migrations/*.{ts,js}'],
    synchronize: false
});

export default AppDataSource;
