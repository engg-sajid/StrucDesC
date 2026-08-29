'use server';

import { db } from '@/prisma/db';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function registerUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Prisma 8 syntax: .where({}).first() instead of .findUnique()
  const existingUser = await db.user.where({ email }).first();
  if (existingUser) return { error: 'User already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Prisma 8 syntax: flat properties instead of nested { data: {} }
  const user = await db.user.create({
    email,
    password: hashedPassword,
  });

  const session = await encrypt({ userId: user.id, email: user.email });
  const cookieStore = await cookies();
  cookieStore.set('session', session, { httpOnly: true, secure: true });

  return { success: true };
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Prisma 8 syntax: .where({}).first() instead of .findUnique()
  const user = await db.user.where({ email }).first();
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid credentials' };
  }

  const session = await encrypt({ userId: user.id, email: user.email });
  const cookieStore = await cookies();
  cookieStore.set('session', session, { httpOnly: true, secure: true });

  return { success: true };
}