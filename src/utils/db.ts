// src/utils/db.ts
import { Pool } from 'pg';

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usermanagementsystem_db',
    password: 'postgres',
    port: 5432,
});

// Function to query the database
export async function query(text: string, params: any[] = []) {
    const start = Date.now();
    const client = await pool.connect();
    try {
        const result = await client.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query:', { text, duration, rows: result.rowCount });
        return result.rows;
    } finally {
        client.release();
    }
}

// CRUD functions for users
export async function createUser(username: string, email: string, password: string) {
    const result = await query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    return result[0];
}

export async function getUsers() {
    return query('SELECT * FROM users');
}

export async function getUserById(id: number) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result[0];
}

export async function updateUser(id: number, username: string, email: string) {
    const result = await query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [username, email, id]);
    return result[0];
}

export async function deleteUser(id: number) {
    await query('DELETE FROM users WHERE id = $1', [id]);
}

export async function getUserByUsername(username: string) {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);
    return result[0];
}