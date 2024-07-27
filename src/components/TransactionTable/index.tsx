import React from 'react';

interface TransactionTableProps {
  transactions: TransactionTemplate[];
}

export interface TransactionTemplate {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'entrada' | 'saida'; 
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto mx-auto max-w-[1120px] pt-8">
      <table className="w-full min-w-max">
        <thead>
          <tr>
            <th className="text-gray-400 text-left px-8 py-4 font-light">Título</th>
            <th className="text-gray-400 text-left px-8 py-4 font-light">Preço</th>
            <th className="text-gray-400 text-left px-8 py-4 font-light">Categoria</th>
            <th className="text-gray-400 text-left px-8 py-4 font-light">Data</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y-8 divide-background">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="h-16">
              <td className="px-8 py-4">{transaction.title}</td>
              <td className={`px-8 py-4 ${transaction.type === 'entrada' ? 'text-income-value' : 'text-outcome-value'}`}>
                {transaction.type === 'saida' ? 
                  `-${transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` :
                  transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                }
              </td>
              <td className="px-8 py-4 text-gray-400">{transaction.category}</td>
              <td className="px-8 py-4 text-gray-400">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
