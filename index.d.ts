import { Request, Response, NextFunction } from "express";

export declare function sanitizeMongoInput(
  req: Request,
  res: Response,
  next: NextFunction
): void;
