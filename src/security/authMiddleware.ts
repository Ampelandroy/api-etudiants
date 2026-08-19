import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export function verifyToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.SECRET_KEY as string, function(err: any, user: any) {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
export function isAdmin(req: any, res: Response, next: NextFunction) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
}