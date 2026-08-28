'use server';

import { db } from '@/prisma/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function deleteCalculationHistory(id: string) {
  const session = await getSession();
  
  if (!session?.userId) {
    return { error: 'Unauthorized' };
  }

  const item = await db.calculationHistory.where({ id }).first();
  if (!item || item.userId !== session.userId) {
    return { error: 'Not found or unauthorized' };
  }

  await db.calculationHistory.where({ id }).delete();

  revalidatePath('/history');
  return { success: true };
}