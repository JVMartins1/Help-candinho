import { ItemListaConsumo } from '@/pages/api/consumo/obterListaConsumo';

export const ListaConsumoTable = ({ itens }: { itens: ItemListaConsumo[] }) => {
  return (
    <ol>
      {itens.map((item) => (
        <li key={item.equipamento}>
          <li>{item.equipamento}</li>
          <li>{item.potencia}</li>
          <li>{item.consumo}</li>
          <li>{item.tempoDeUso}</li>
          <li>{item.consumoDia}</li>
          <li>{item.valorHora}</li>
          <li>{item.valorDia}</li>
        </li>
      ))}
    </ol>
  );
};
