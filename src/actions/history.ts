'use server';

import { db } from '@/prisma/db';
import { getSession } from '@/lib/auth';

export async function saveCalculationHistory(moduleType: string, title: string, inputs: any, results: any) {
  const session = await getSession();
  
  if (!session?.userId) {
    return { error: 'Unauthorized' }; // Client will catch this
  }

  const history = await db.calculationHistory.create({
    data: {
      userId: session.userId,
      moduleType,
      title,
      inputs,
      results,
    },
  });

  return { success: true, history };
}