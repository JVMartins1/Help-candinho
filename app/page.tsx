'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DadosRelevantes } from '@/pages/api/growatt';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, LineChart, CartesianGrid, XAxis, Line } from 'recharts';
import { ListaConsumoTable } from './components/lista-consumo-table';
import { ItemListaConsumo } from '@/pages/api/consumo/obterListaConsumo';
import { DataTable } from './components/listaPagamento/data-table';
import { columns } from './components/listaPagamento/columns';

const chartConfig = {
  eacToday: {
    label: 'eacToday',
    color: '#2563eb',
  },
  ppv: {
    label: 'ppv',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export default function Home() {
  const [dadosGrowatt, setDadosGrowatt] = useState<DadosRelevantes>();
  const [listaConsumo, setListaConsumo] = useState<ItemListaConsumo[]>([]);

  useEffect(() => {
    axios.get<ItemListaConsumo[]>('/api/consumo/obterListaConsumo').then((res) => {
      setListaConsumo(res.data);
    });
  }, []);

  return (
    <>
      {/* <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <LineChart accessibilityLayer data={dadosGrowatt.filter((_v, i) => i < 30)}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line dataKey="eacToday" fill="var(--color-desktop)" radius={4} />
          <Line dataKey="ppv" fill="var(--color-mobile)" radius={4} />
        </LineChart>
      </ChartContainer> */}

      <DataTable columns={columns} data={listaConsumo} />
      <Button
        onClick={async () => {
          const dados = await axios.post<DadosRelevantes>('/api/growatt/obterDadosDia', { diaConsulta: new Date('2024-11-02') });
          setDadosGrowatt(dados.data);
        }}
      >
        ObterDados
      </Button>
      <Button
        onClick={() => {
          toast({ title: 'Teste', description: 'Descrição' + Math.random() });
        }}
      >
        Toast
      </Button>
    </>
  );
}
