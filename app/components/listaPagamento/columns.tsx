'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ItemListaConsumo } from '@/pages/api/consumo/obterListaConsumo';
import { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const sortFn = (column: Column<ItemListaConsumo, unknown>, title: string) => {
  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<ItemListaConsumo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: 'equipamento', header: ({ column }) => sortFn(column, 'Equipamento') },
  { accessorKey: 'potencia', header: ({ column }) => sortFn(column, 'Potencia') },
  { accessorKey: 'consumo', header: ({ column }) => sortFn(column, 'Consumo') },
  { accessorKey: 'tempoDeUso', header: ({ column }) => sortFn(column, 'TempoDeUso') },
  { accessorKey: 'consumoDia', header: ({ column }) => sortFn(column, 'ConsumoDia') },
  { accessorKey: 'valorHora', header: ({ column }) => sortFn(column, 'ValorHora') },
  { accessorKey: 'valorDia', header: ({ column }) => sortFn(column, 'ValorDia') },
];
