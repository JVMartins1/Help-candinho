'use server';

import { NextApiRequest, NextApiResponse } from 'next';

const api = require('growatt');

/**
 *
 * plantData	Boolean	true	True calls the description dataset of the plant.
 * deviceData	Boolean	true	True calls the description dataset of the plantdevice.
 * weather	Boolean	true	True calls the weather dataset of the plant.
 * faultlog	Boolean	false	True retrieves the plant's fault logs. An array with the most recent event first is returned.
 * faultlogdate	String	'YYYY'	It is only taken into account if faultlog is true. It must be a string with the date in 'YYYY', 'YYYY-MM', 'YYYY-MM-DD'.
 * faultlogdateindex	Boolean	true	It is only taken into account if faultlog is true. The array is converted into timestampsobjects.
 * plantId	Integer	undefined	The ID of a plant. So that the output can be restricted. Attention, the ID is constantly changing on demologin.
 * totalData	Boolean	true	Retrieves the data integrals. The sums since start time.
 * statusData	Boolean	true	This is not available for all systems. Here, the current operating status, fuel injection, battery charge and generation is called up. However, the data is also contained in historyLast.
 * deviceTyp	Boolean	false	Add the device type to the Output.
 * historyLast	Boolean	true	The last data record from the system history table is called up here.
 * historyAll	Boolean	false	All data records from the system history table is called up here.
 * historyLastStartDate	new Date()	yesterday	The start time for retrieving the history.
 * historyLastEndDate	new Date()	tomorrow	The end time for retrieving the history.
 * historyStart	Integer	0	The server does not send all data for the time range. With the starting index you get the next rows.
 */

export type DadosRelevantes = { date: Date; eacToday: number; eacTotal: number; ppv: number; consumoHoje: number; old: any };

const user = 'jaimeblumenau@gmail.com';
const password = 'Orangesun123';

const historyLastStartDate = new Date('2024-10-01');
const historyLastEndDate = new Date('2024-10-01');
const daysBetween = (historyLastEndDate.getTime() - historyLastStartDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

const options = {
  historyAll: true,
  historyLastStartDate: historyLastStartDate,
  historyLastEndDate: historyLastEndDate,
  // plantId
  plantData: true,
  deviceData: true,
  weather: true,
  totalData: true,
  statusData: false,
  historyLast: true,
  historyStart: 0,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const growatt = new api({});
  try {
    let login = await growatt.login(user, password).catch((e: any) => {
      console.log(e);
    });
    console.log('login:', login);

    const dias = Array.from(Array(daysBetween).keys());
    let getAllPlantData: any = [];

    await Promise.all(
      dias.map(async (_dia, index) => {
        const resDia = await growatt.getAllPlantData({ ...options, historyStart: index }).catch((e: any) => {
          console.log('Index', index, e);
        });

        getAllPlantData.push(resDia);
        debugger;
        console.log('getAllPlatData:', JSON.stringify(getAllPlantData, null, ' '));
      }),
    );

    const histArrays = getAllPlantData
      .map((data: any) =>
        data[2585476].devices.DXHMDZA00J.historyAll.map((historyData: any) => {
          const dadosRelevantes: DadosRelevantes = {
            date: new Date(historyData.calendar),
            eacToday: historyData.eacToday,
            eacTotal: historyData.eacTotal,
            ppv: historyData.ppv,
            old: { ...historyData },
            consumoHoje: historyData.elocalLoadToday,
          };
          return dadosRelevantes;
        }),
      )
      .flat()
      .sort((a: any, b: any) => {
        return a.date - b.date;
      });

    console.dir(histArrays);

    await growatt.logout().catch((e: any) => {
      console.log(e);
    });

    debugger;
    res.status(200).json(histArrays);
  } catch (e) {
    console.error(e);
    await growatt.logout().catch((e: any) => {
      console.log(e);
    });
    throw e;
  }
}
