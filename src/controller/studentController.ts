import { Request, Response } from 'express';
import { StudentRepository } from '../repository/studentRepository.js';
const studentRepository = new StudentRepository();
export async function getAllStudents(req: Request, res: Response): Promise<void> {
    try {
        const students = await studentRepository.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
export async function getStudentById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const student = await studentRepository.findById(Number(id));
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
export async function createStudent(req: Request, res: Response): Promise<void> {
    try {
        const newStudent = req.body;
        const createdStudent = await studentRepository.save(newStudent);
        res.status(201).json({ message: "Student created successfully", student: createdStudent });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
export async function updateStudent(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const student = await studentRepository.update(Number(id), updatedData);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ message: `Student ${id} updated`, data: student });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
export async function patchStudent(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const partialData = req.body;
        const student = await studentRepository.update(Number(id), partialData);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ message: `Student ${id} partially updated`, data: student });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
export async function deleteStudent(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const isDeleted = await studentRepository.delete(Number(id));
        if (!isDeleted) {
            res.status(404).json({ message: "Student not found" });
            return;
        }
        res.status(200).json({ message: `Student ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}