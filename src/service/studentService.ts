import { StudentRepository } from '../repository/studentRepository.js';
import { Student } from '../model/student.js';
export class StudentService {
    private repository = new StudentRepository();
    async findAll(): Promise<Student[]> {
        return await this.repository.findAll();
    }
    async findById(id: number): Promise<Student | undefined> {
        return await this.repository.findById(id);
    }
    async create(student: Student): Promise<Student> {
        return await this.repository.save(student);
    }
    async update(id: number, student: Partial<Student>): Promise<Student | undefined> {
        return await this.repository.update(id, student);
    }
    async delete(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }
}