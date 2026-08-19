import express, { Express } from 'express';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(studentRoutes);
app.listen(3000, function(): void {
    console.log("Server started on http://localhost:3000");
});