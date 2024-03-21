// src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export async function loginUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
        const token = await authService.login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function logoutUser(req: Request, res: Response): Promise<void> {
    res.status(200).json({ message: 'Logout successful' });
}

export async function registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    try {
        const user = await authService.register(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
