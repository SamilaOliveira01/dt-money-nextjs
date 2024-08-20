'use client';
import React, { useState, useEffect } from 'react';
import Container, { ContainerTemplate } from '@/components/Containers';
import { Header } from '@/components/Header';
import TransactionTable from '@/components/TransactionTable';
import { TransactionTemplate } from '@/pages/api/transactions';
import Modal from '@/components/Modal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useTransaction } from '@/hooks/useTransaction';

export default function Home() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    fetchTransactions
  } = useTransaction();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<TransactionTemplate | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleOpenModal = (transaction?: TransactionTemplate) => {
    setCurrentTransaction(transaction || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTransaction(null);
  };

  const handleAddTransaction = (transaction: TransactionTemplate | null) => {
    if (transaction) {
      if (currentTransaction) {
        updateTransaction(transaction)
          .then(() => fetchTransactions());
      } else {
        addTransaction(transaction)
          .then(() => fetchTransactions());
      }
    }
    handleCloseModal();
  };

  const handleDeleteTransaction = (id: string) => {
    setConfirmDeleteId(id);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      deleteTransaction(confirmDeleteId)
        .then(() => fetchTransactions())
        .finally(() => setIsConfirmationModalOpen(false));
    }
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setConfirmDeleteId(null);
  };

  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'entrada')
      .reduce((acc, t) => acc + t.price, 0);

    const outcome = transactions
      .filter(t => t.type === 'saida')
      .reduce((acc, t) => acc + t.price, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total
    };
  };

  const { income, outcome, total } = calculateTotals();

  const containers: ContainerTemplate[] = [
    {
      id: 1,
      title: 'Entradas',
      amount: income,
      icon: '/images/entradas.png',
      backgroundColor: 'bg-white',
      textColor: 'text-title'
    },
    {
      id: 2,
      title: 'Saídas',
      amount: outcome,
      icon: '/images/saídas.png',
      backgroundColor: 'bg-white',
      textColor: 'text-title'
    },
    {
      id: 3,
      title: 'Total',
      amount: total,
      icon: '/images/total.png',
      backgroundColor: 'bg-income-value',
      textColor: 'text-white',
    }
  ];

  return (
    <>
      <Header onOpenModal={() => handleOpenModal()} />
      <div className="mx-auto max-w-[1120px] flex justify-between -mt-24 pt-8">
        {containers.map((container) => (
          <Container key={container.id} container={container} />
        ))}
      </div>
      <TransactionTable
        transactions={transactions}
        onEdit={(transaction) => handleOpenModal(transaction)}
        onDelete={handleDeleteTransaction}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
        initialData={currentTransaction}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmDelete}
        message="Tem certeza de que deseja excluir esta transação?"
      />
    </>
  );
}
