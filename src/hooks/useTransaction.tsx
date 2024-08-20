import { useState } from 'react';
import { TransactionTemplate } from '@/components/TransactionTable';

export function useTransaction() {
  const [transactions, setTransactions] = useState<TransactionTemplate[]>(() => {
    // Inicializa o estado com dados do armazenamento local, se disponível
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  });

  const saveToLocalStorage = (data: TransactionTemplate[]) => {
    localStorage.setItem('transactions', JSON.stringify(data));
  };

  const fetchTransactions = () => {
    // Simula a recuperação das transações do armazenamento local
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(storedTransactions);
  };

  const addTransaction = (transaction: TransactionTemplate) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    saveToLocalStorage(updatedTransactions);
  };

  const updateTransaction = (updatedTransaction: TransactionTemplate) => {
    const updatedTransactions = transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    saveToLocalStorage(updatedTransactions);
  };

  const deleteTransaction = (id: number) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    saveToLocalStorage(updatedTransactions);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
  };
}
