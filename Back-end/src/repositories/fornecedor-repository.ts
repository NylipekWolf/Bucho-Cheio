import { db } from "../config/db";

export async function getUserById(userId: string) {
  const rows = await db.query(
    "SELECT * FROM users WHERE id = $1",
    userId.toString()
  );
  return rows[0];
}
