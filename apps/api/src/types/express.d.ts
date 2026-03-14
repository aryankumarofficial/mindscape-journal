import type { JwtPayload } from "@repo/types/generics";
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}
