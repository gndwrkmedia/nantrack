
import postgres from 'postgres';

// Vercel's POSTGRES_URL includes the necessary SSL configuration.
// Specifying it again in the options can cause connection errors.
const sql = postgres(process.env.POSTGRES_URL!);

export default sql;
