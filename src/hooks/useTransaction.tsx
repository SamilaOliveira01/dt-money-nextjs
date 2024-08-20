import { useState } from 'react';
import axios from 'axios';
import { TransactionTemplate } from '@/pages/api/transactions';

const API_BASE_URL = 'http://localhost:3333/api/transaction';

export function useTransaction() {
  const [transactions, setTransactions] = useState<TransactionTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setTransactions(response.data);
    } catch (error) {
      setError('Error fetching transactions');
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: TransactionTemplate) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(API_BASE_URL, transaction);
      await fetchTransactions();
    } catch (error) {
      setError('Error adding transaction');
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (transaction: TransactionTemplate) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/${transaction.id}`, transaction);
      await fetchTransactions();
    } catch (error) {
      setError('Error updating transaction');
      console.error('Error updating transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: string) => { 
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      await fetchTransactions(); 
    } catch (error) {
      setError('Error deleting transaction');
      console.error('Error deleting transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
    loading,
    error,
  };
}
