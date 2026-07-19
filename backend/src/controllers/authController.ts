import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";

const JWT_SECRET = process.env.JWT_SECRET || "yemen_grade12_secret_key_2026_super_secure";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "يرجى ملء جميع الحقول المطلوبة." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "البريد الإلكتروني مسجل بالفعل." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "STUDENT"
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({
      success: true,
      message: "تم تسجيل الحساب بنجاح.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء التسجيل.", error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "يرجى إدخال البريد الإلكتروني وكلمة المرور." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "بيانات الاعتماد غير صالحة." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "بيانات الاعتماد غير صالحة." });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "30d" });

    res.json({
      success: true,
      message: "تم تسجيل الدخول بنجاح.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "حدث خطأ أثناء تسجيل الدخول.", error: error.message });
  }
};
