import { Database } from './database.js';
import { User } from '../model/user.js';
export class UserRepository {
    private pool: any = Database.getPool();
    async findByUsername(username: string): Promise<User | undefined> {
        const result: any = await this.pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    }
}