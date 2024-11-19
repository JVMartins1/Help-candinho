import { NextApiRequest, NextApiResponse } from 'next';
import { drizzle } from 'drizzle-orm/libsql';
import { consumoTable } from '@/schemas/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(process.env.DB_FILE_NAME!);

export default async function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  try {
    const { equipamentos }: { equipamentos: string[] } = req.body;

    equipamentos.forEach(async (equipamento) => {
      await db.delete(consumoTable).where(eq(consumoTable.equipamento, equipamento));
    });

    res.status(200);
  } catch (e) {
    console.error(e);
    throw e;
  }
}
