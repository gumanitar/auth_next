import { db } from "./db";

async function main() {
  try {
    const result = await db.execute(`SHOW TABLES`);
    console.log("Таблиці в базі:", result);
  } catch (err) {
    console.error("Помилка при перевірці таблиць:", err);
  }
}

main();