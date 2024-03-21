// src/services/authService.ts
import { User } from '../models/User';
import * as db from '../utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export class AuthService {
    
    async login(username: string, password: string): Promise<string> {
        try {
            const user: User | null = await db.getUserByUsername(username);
            if (!user) {
                throw new Error('User not found');
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            throw error;
        }
    }

    async register(username: string, email: string, password: string): Promise<User> {
        try {

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await db.createUser(username, email, hashedPassword);
            return user;
        } catch (error) {
            throw error;
        }
    }
}
