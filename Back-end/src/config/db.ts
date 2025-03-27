import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  user: "bucho-postgres",
  host: "localhost",
  database: "bucho-cheio",
  password: "",
  port: 5432,
});
export const db = {
  query: (text: string, params: string) => pool.query(text, params),
};
