"use client";

import React, { useState } from 'react';
import Container, { ContainerTemplate } from "@/components/Containers";
import { Header } from "@/components/Header";
import TransactionTable, { TransactionTemplate } from "@/components/TransactionTable";
import Modal from '@/components/Modal';

const initialTransactions: TransactionTemplate[] = [
  { id: 1, title: 'Desenvolvimento de site', amount: 12000, category: 'Venda', date: '13/04/2021', type: 'entrada' },
  { id: 2, title: 'Hamburguer', amount: 59, category: 'Alimentação', date: '10/04/2021', type: 'saida' },
  { id: 3, title: 'Aluguel do apartamento', amount: 1200, category: 'Casa', date: '27/03/2021', type: 'saida' },
  { id: 4, title: 'Computador', amount: 5400, category: 'Venda', date: '15/03/2021', type: 'entrada' },
];

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionTemplate[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddTransaction = (transaction: TransactionTemplate) => {
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  };

  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'entrada')
      .reduce((acc, t) => acc + t.amount, 0);

    const outcome = transactions
      .filter(t => t.type === 'saida')
      .reduce((acc, t) => acc + t.amount, 0);

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
      <Header onOpenModal={handleOpenModal} />
      <div className="mx-auto max-w-[1120px] flex justify-between -mt-24 pt-8">
        {containers.map((container) => (
          <Container key={container.id} container={container} />
        ))}
      </div>
      <TransactionTable transactions={transactions} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddTransaction} />
    </>
  );
}
