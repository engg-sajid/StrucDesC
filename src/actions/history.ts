'use server';

import { db } from '@/prisma/db';
import { getSession } from '@/lib/auth';

export async function saveCalculationHistory(moduleType: string, title: string, inputs: any, results: any) {
  const session = await getSession();
  
  if (!session?.userId) {
    return { error: 'Unauthorized' };
  }

  await db.calculationHistory.create({
    userId: session.userId,
    moduleType,
    title,
    inputs,
    results,
  });

  return { success: true };
}