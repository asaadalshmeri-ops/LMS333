import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yemen_grade12_secret_key_2026_super_secure";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "STUDENT" | "TEACHER" | "ADMIN";
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "غير مصرح؛ يرجى تسجيل الدخول أولاً." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: "STUDENT" | "TEACHER" | "ADMIN" };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "انتهت صلاحية الجلسة؛ يرجى إعادة تسجيل الدخول." });
  }
};

export const requireRole = (roles: ("STUDENT" | "TEACHER" | "ADMIN")[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "صلاحيات غير كافية للقيام بهذا الإجراء." });
    }
    next();
  };
};
