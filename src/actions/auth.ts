'use server';

import { db } from '@/prisma/db';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) return { error: 'User already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { email, password: hashedPassword },
  });

  const session = await encrypt({ userId: user.id, email: user.email });
  const cookieStore = await cookies();
  cookieStore.set('session', session, { httpOnly: true, secure: true });

  return { success: true };
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' };
  }

  const session = await encrypt({ userId: user.id, email: user.email });
  const cookieStore = await cookies();
  cookieStore.set('session', session, { httpOnly: true, secure: true });

  return { success: true };
}