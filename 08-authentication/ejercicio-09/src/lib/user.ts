import db from './db';

export function createUser(email: string, password: string) {
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(email, password);
  return result.lastInsertRowid;
}


type User = {
  id: number;
  email: string;
  password: string;
  // otras propiedades del usuario
};

export function getUserByEmail(email: string): Promise<User | null> {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | null;
  return Promise.resolve(user);
}