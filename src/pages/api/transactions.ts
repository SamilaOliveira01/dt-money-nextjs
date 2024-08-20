// src/pages/api/transactions.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Exemplo de um banco de dados em memória
let transactions: TransactionTemplate[] = [];

// Tipo para as transações
export interface TransactionTemplate {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  type: 'entrada' | 'saida';
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Retorna todas as transações
      res.status(200).json(transactions);
      break;

    case 'POST':
      // Adiciona uma nova transação
      const newTransaction: TransactionTemplate = req.body;
      transactions.push(newTransaction);
      res.status(201).json(newTransaction);
      break;

    case 'PUT':
      // Atualiza uma transação existente
      const updatedTransaction: TransactionTemplate = req.body;
      transactions = transactions.map(t =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      );
      res.status(200).json(updatedTransaction);
      break;

    case 'DELETE':
      // Remove uma transação pelo ID
      const { id } = req.query;
      transactions = transactions.filter(t => t.id !== Number(id));
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
