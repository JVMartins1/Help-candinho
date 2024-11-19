import { drizzle } from 'drizzle-orm/libsql';
import { consumoTable } from '@/schemas/schema';
import listaConsumoJson from './listaConsumo.json';

const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  listaConsumoJson.forEach(async (c, i) => {
    console.log(c);
    await db.insert(consumoTable).values(c);
  });
}

main();
