// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { User } from '../models/User';
import { get } from '../utils/apiUtils';

export async function createUser(req: Request, res: Response): Promise<void> {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ error: 'Please provide username, email, and password' });
            return;
        }

        const user: User = await userService.createUser(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export async function getUsers(req: Request, res: Response): Promise<void> {
    try {
        const users: User[] = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
    try {

        const userId: number = parseInt(req.params.id);
        const user: User | null = await userService.getUserById(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const url = 'https://dummyjson.com/users/search?q=' + user.username
        const response = await get(url);
        
        if (response.status === 200) {
            const userData = response.data;
            res.status(200).json(userData);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch user data' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const userId: number = parseInt(req.params.id);
        const { username, email } = req.body;

        const updatedUser: User | null = await userService.updateUser(userId, username, email);

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const userId: number = parseInt(req.params.id);
        await userService.deleteUser(userId);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
