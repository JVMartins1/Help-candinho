import { NextApiRequest, NextApiResponse } from 'next';
import { drizzle } from 'drizzle-orm/libsql';
import { consumoTable } from '@/schemas/schema';

const db = drizzle(process.env.DB_FILE_NAME!);

export type ItemListaConsumo = {
  equipamento: string;
  potencia: number;
  consumo: number;
  tempoDeUso: number;
  consumoDia: string;
  valorHora: string;
  valorDia: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ItemListaConsumo[]>) {
  try {
    const consumo = await db.select().from(consumoTable).all();

    res.status(200).json(
      consumo.map((c) => {
        const itemLista: ItemListaConsumo = {
          equipamento: c.equipamento,
          potencia: c.potencia,
          consumo: c.consumo,
          tempoDeUso: c.tempoDeUso,
          consumoDia: (c.consumo * c.tempoDeUso).toFixed(2),
          valorHora: (c.consumo * 0.61).toFixed(2),
          valorDia: (c.consumo * c.tempoDeUso * 0.61).toFixed(2),
        };

        return itemLista;
      }),
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
}
