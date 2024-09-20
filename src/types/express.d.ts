import * as express from 'express';
import { User } from '../modules/auth/entities';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
