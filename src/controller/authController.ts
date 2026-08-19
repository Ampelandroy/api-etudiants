import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repository/userRepository.js';
const userRepository = new UserRepository();
export async function login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
        const user = await userRepository.findByUsername(username);
        if (user && user.password && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                process.env.SECRET_KEY as string,
                { expiresIn: '1h' }
            );
            res.status(200).json({ token });
            return;
        }
        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}