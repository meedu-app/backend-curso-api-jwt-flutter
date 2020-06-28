import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      filePath?: string;
    }
  }
}

export const isLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token } = req.headers;
    const result: any = await jwt.verify(token as string, process.env.SECRET!);
    if (!result) {
      throw new Error('invalid token');
    }
    req.userId = result.id;
    next();
  } catch (error) {
    res.status(403).send({ message: error.message });
  }
};
