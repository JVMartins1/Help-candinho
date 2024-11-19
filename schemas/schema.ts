import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const consumoTable = sqliteTable('consumo_table', {
  equipamento: text().primaryKey(),
  potencia: int().notNull(),
  consumo: int().notNull(),
  tempoDeUso: int().notNull(),
});

export const dadosPlantaTable = sqliteTable('dados_planta_table', {
  dataInformacao: int().primaryKey(),
  energiaGerada: int().notNull(),
});
