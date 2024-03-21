// src/services/userService.ts
import { User } from '../models/User';
import * as db from '../utils/db';

export async function createUser(username: string, email: string, password: string): Promise<User> {
    try {
        const user = await db.createUser(username, email, password);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUsers(): Promise<User[]> {
    try {
        const users = await db.getUsers();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export async function getUserById(id: number): Promise<User | null> {
    try {
        const user = await db.getUserById(id);
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

export async function updateUser(id: number, username: string, email: string): Promise<User> {
    try {
        const user = await db.updateUser(id, username, email);
        return user;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function deleteUser(id: number): Promise<void> {
    try {
        await db.deleteUser(id);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}
