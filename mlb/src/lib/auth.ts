import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "./prisma";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "fallback-secret";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function ensureAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@mlb.mk";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hashed = await hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashed,
        name: "MLB Admin",
        role: "admin",
      },
    });
  }
}
