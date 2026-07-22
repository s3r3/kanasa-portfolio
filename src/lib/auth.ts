import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export interface SessionData {
  adminId?: string;
  username?: string;
  isLoggedIn?: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'kanasa_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}

export async function login(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return false;

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return false;

  const session = await getSession();
  session.adminId = admin.id;
  session.username = admin.username;
  session.isLoggedIn = true;
  await session.save();
  return true;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function requireAuth() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    throw new Error('Unauthorized');
  }
  return session;
}
