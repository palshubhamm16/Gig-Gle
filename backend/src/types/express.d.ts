// src/express.d.ts

import { CustomUser } from "./types/index"; // or just './types' if using index.ts

declare global {
  namespace Express {
    interface Request {
      user?: CustomUser;
    }
  }
}

export {};
