import dotenv from 'dotenv';

dotenv.config();

const dbConfig: {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  PORT: any;
  dialect: string;
  pool: any;
} = {
  HOST: process.env['HOST'] || 'localhost',
  USER: process.env['DB_USER'] || 'root',
  PASSWORD: process.env['PASSWORD'] || 'root',
  DB: process.env['DB_NAME'] || 'your_db_name',
  PORT: process.env['DB_PORT'],
  dialect: 'postgres' || 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export { dbConfig };
