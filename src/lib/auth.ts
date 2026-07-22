import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import type { IronSession, SessionOptions } from 'iron-session';

const sessionOptions: SessionOptions = {
  cookieName: 'portfolio-session',
  password: process.env.SESSION_SECRET!,
  ttl: 60 * 60 * 24, // 1 day
};

export interface SessionData {
  admin?: {
    id: string;
    username: string;
  };
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function login(username: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new Error('Invalid credentials');
  }
  const session = await getSession();
  session.admin = { id: admin.id, username: admin.username };
  await session.save();
  return session.admin;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function requireAuth() {
  const session = await getSession();
  if (!session.admin) {
    throw new Error('Unauthorized');
  }
  return session.admin;
}
