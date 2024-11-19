'use server';

import { dadosPlantaTable } from '@/schemas/schema';
import { drizzle } from 'drizzle-orm/libsql';
import { NextApiRequest, NextApiResponse } from 'next';

const api = require('growatt');

const db = drizzle(process.env.DB_FILE_NAME!);

export type DadosRelevantes = { date: Date; eacToday: number };

export type GetAllPlantData = {
  [x: string]: {
    plantData: {
      city: string;
      country: string;
      co2: number;
      coal: number;
      eTotal: number;
      formulaCo2: number;
      formulaCoal: number;
      formulaTree: number;
      formulaMoney: number;
      lat: number;
      lng: number;
      moneyUnit: string;
      tree: number;
    };
    devices: {
      [x: string]: {
        historyAll: {
          calendar: string;
          eacToday: number;
        }[];
      };
    };
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { diaConsulta }: { diaConsulta: string } = req.body;

  const user = 'jaimeblumenau@gmail.com';
  const password = 'Orangesun123';

  const historyLastStartDate = new Date(diaConsulta);
  const historyLastEndDate = new Date(diaConsulta);

  const options = {
    historyAll: true,
    historyLastStartDate: historyLastStartDate,
    historyLastEndDate: historyLastEndDate,
    // plantId
    plantData: true,
    deviceData: true,
    weather: false,
    totalData: false,
    statusData: false,
    historyLast: true,
  };

  const growatt = new api({});
  try {
    await growatt.login(user, password).catch((e: any) => {
      console.log(e);
    });

    let getAllPlantData: DadosRelevantes | undefined = undefined;
    let index = 0;
    while (true) {
      const resDia: GetAllPlantData = await growatt.getAllPlantData({ ...options, historyStart: index });

      const plants = Object.keys(resDia);

      if (plants.length === 0) {
        break;
      }

      plants.forEach((plant) => {
        const devices = Object.keys(resDia[plant].devices);

        devices.forEach(async (device) => {
          const historyAll = resDia[plant].devices[device].historyAll.filter(
            (historyData) => new Date(historyData.calendar).getUTCDate() === new Date(diaConsulta).getUTCDate(),
          );

          const dadosRelevantes: DadosRelevantes = {
            date: new Date(historyAll[0].calendar.split('T')[0]),
            eacToday: historyAll[0].eacToday,
          };
          getAllPlantData = dadosRelevantes;

          const teste = await db.insert(dadosPlantaTable).values({ energiaGerada: dadosRelevantes.eacToday, dataInformacao: dadosRelevantes.date.getTime() });
          console.log('teste:', teste);
        });
      });

      console.log('getAllPlatData:', JSON.stringify(getAllPlantData, null, ' '));
      break;
    }

    await growatt.logout().catch((e: any) => {
      console.log(e);
    });

    res.status(200).json(getAllPlantData);
  } catch (e) {
    console.error(e);
    await growatt.logout().catch((e: any) => {
      console.log(e);
    });
    throw e;
  }
}
