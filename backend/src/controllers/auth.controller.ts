import { Request, Response } from 'express';

export async function register(req: Request, res: Response): Promise<void> {
  res.status(501).json({ message: 'Register endpoint not implemented yet.' });
}

export async function login(req: Request, res: Response): Promise<void> {
  res.status(501).json({ message: 'Login endpoint not implemented yet.' });
}
