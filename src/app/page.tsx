import Container, {ContainerTemplate} from "@/components/Containers";
import {Header} from "@/components/Header";
import React from "react";
import TransactionTable, {TransactionTemplate} from "@/components/TransactionTable";

const transactions: TransactionTemplate[] = [
  {id: 1, title: 'Desenvolvimento de site', amount: 12000, category: 'Venda', date: '13/04/2021'},
  {id: 2, title: 'Hamburguer', amount: -59, category: 'Alimentação', date: '10/04/2021'},
  {id: 3, title: 'Aluguel do apartamento', amount: -1200, category: 'Casa', date: '27/03/2021'},
  {id: 4, title: 'Computador', amount: 5400, category: 'Venda', date: '15/03/2021'},
];

const containers: ContainerTemplate[] = [
    {
        id: 1,
        title: 'Entradas',
        amount: '17400,00',
        icon: '/images/entradas.png',
        backgroundColor: 'bg-white',
        textColor: 'text-title'
    },
    {
        id: 2,
        title: 'Saídas',
        amount: '1259,00',
        icon: '/images/saídas.png',
        backgroundColor: 'bg-white',
        textColor: 'text-title'
    },
    {
        id: 3,
        title: 'Total',
        amount: '16141,00',
        icon: '/images/total.png',
        backgroundColor: 'bg-income-value',
        textColor: 'text-white',
    }
];

export default function Home() {
    return (
        <>
            <Header/>
            <div className="mx-auto max-w-[1120px] flex justify-between -mt-24 pt-8">
                {containers.map((container) => (
                    <Container key={container.id} container={container}></Container>
                ))}
            </div>
            <TransactionTable transactions={transactions}/>
            <div className="mb-16"></div>
        </>
    );
}