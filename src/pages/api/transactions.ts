import type { NextApiRequest, NextApiResponse } from 'next';

export interface TransactionTemplate {
  id: string;
  title: string;
  price: number;
  category: string;
  date: string;
  type: 'entrada' | 'saida';
}

let transactions: TransactionTemplate[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(transactions);
      break;

    case 'POST':
      const newTransaction: TransactionTemplate = req.body;
      transactions.push(newTransaction);
      res.status(201).json(newTransaction);
      break;

    case 'PUT':
      const updatedTransaction: TransactionTemplate = req.body;
      transactions = transactions.map(t =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      );
      res.status(200).json(updatedTransaction);
      break;

    case 'DELETE':
      const { id } = req.query;
      if (typeof id === 'string') {
        transactions = transactions.filter(t => t.id !== id);
        res.status(204).end();
      } else {
        res.status(400).json({ error: 'ID inválido' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
