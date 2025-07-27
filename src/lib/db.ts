
import postgres from 'postgres';

let sql: postgres.Sql;

if (process.env.NODE_ENV === 'production') {
  sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
} else {
  // Ensure the global object has a `sql` property in development
  if (!(global as any).sql) {
    (global as any).sql = postgres(process.env.POSTGRES_URL!);
  }
  sql = (global as any).sql;
}

export default sql;
