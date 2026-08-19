import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;
export class Database {
    private static pool: any;
    public static getPool() {
        if (!Database.pool) {
            Database.pool = new Pool({
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                host: 'localhost',
                database: 'students_db',
                port: 5432
            });
        }
        return Database.pool;
    }
}