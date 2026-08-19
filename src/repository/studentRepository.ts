import { Database } from './database.js';
import { Student } from '../model/student.js';
export class StudentRepository {
    private pool: any = Database.getPool();
    async findAll(): Promise<Student[]> {
        const result: any = await this.pool.query('SELECT * FROM students');
        return result.rows;
    }
    async findById(id: number): Promise<Student | undefined> {
        const result: any = await this.pool.query('SELECT * FROM students WHERE id = $1', [id]);
        return result.rows[0];
    }
    async save(student: Student): Promise<Student> {
        const result: any = await this.pool.query(
            'INSERT INTO students ("lastName", "firstName", email) VALUES ($1, $2, $3) RETURNING *',
            [student.lastName, student.firstName, student.email]
        );
        return result.rows[0];
    }
    async update(id: number, updatedData: Partial<Student>): Promise<Student | undefined> {
        const current: Student | undefined = await this.findById(id);
        if (!current) return undefined;
        const lastName: string = updatedData.lastName ?? current.lastName;
        const firstName: string = updatedData.firstName ?? current.firstName;
        const email: string = updatedData.email ?? current.email;
        const result: any = await this.pool.query(
            'UPDATE students SET "lastName" = $1, "firstName" = $2, email = $3 WHERE id = $4 RETURNING *',
            [lastName, firstName, email, id]
        );
        return result.rows[0];
    }
    async delete(id: number): Promise<boolean> {
        const result: any = await this.pool.query('DELETE FROM students WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}