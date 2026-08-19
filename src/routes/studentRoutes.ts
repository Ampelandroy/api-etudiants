import { Router } from 'express';
import { login } from '../controller/authController.js';
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent
} from '../controller/studentController.js';
import { verifyToken, isAdmin } from '../security/authMiddleware.js';
const router = Router();
router.post('/login', login);
router.get('/etudiants', verifyToken, getAllStudents);
router.get('/etudiants/:id', verifyToken, getStudentById);
router.post('/etudiants', verifyToken, isAdmin, createStudent);
router.put('/etudiants/:id', verifyToken, isAdmin, updateStudent);
router.patch('/etudiants/:id', verifyToken, isAdmin, patchStudent);
router.delete('/etudiants/:id', verifyToken, isAdmin, deleteStudent);
export default router;