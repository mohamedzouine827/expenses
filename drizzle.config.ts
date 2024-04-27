import { defineConfig, Config } from 'drizzle-kit';


export default defineConfig({
  schema: "./utils/schema.tsx",
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://expenseDb_owner:LJRfn0DFi6HV@ep-tight-base-a5rkddzv.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require',
  },
  verbose: true,
  strict: true,
}  satisfies Config);
