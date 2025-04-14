// src/types/index.ts

export interface CustomUser {
  sub: string;
  _id?: string;
  email: string;
  campus?: string;
}

import { Request } from "express";

export interface AuthRequest extends Request {
  user?: CustomUser;
}
