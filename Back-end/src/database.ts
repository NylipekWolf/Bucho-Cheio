import postgres from "postgres";
import dotenv from 'dotenv';
dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

export const sql = postgres(URL, {ssl: "prefer"});