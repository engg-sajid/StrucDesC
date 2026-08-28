import 'temporal-polyfill/full/global';
import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

const rawDb = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});

function findModel(target: any, modelName: string) {
  if (!target) return undefined;
  if (target[modelName]) return target[modelName];
  if (target.public && target.public[modelName]) return target.public[modelName];
  if (target.orm && target.orm.public && target.orm.public[modelName]) return target.orm.public[modelName];
  if (target.orm && target.orm[modelName]) return target.orm[modelName];
  if (target.models && target.models[modelName]) return target.models[modelName];
  if (target.tables && target.tables[modelName]) return target.tables[modelName];
  
  for (const key of Object.keys(target)) {
    if (target[key] && typeof target[key] === 'object') {
      const found = target[key][modelName] || target[key][modelName.toLowerCase()];
      if (found) return found;
    }
  }
  return undefined;
}

export const db = new Proxy(rawDb, {
  get(target: any, prop: string) {
    if (prop === 'calculationHistory') {
      return findModel(target, 'calculationHistory') || findModel(target, 'CalculationHistory');
    }
    if (prop === 'user') {
      return findModel(target, 'user') || findModel(target, 'User');
    }
    return target[prop];
  }
});