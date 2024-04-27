import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
const sql = neon('postgresql://expenseDb_owner:LJRfn0DFi6HV@ep-tight-base-a5rkddzv.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require');
export const db = drizzle(sql,{schema});
