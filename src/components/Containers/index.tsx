import React from 'react';

export interface ContainerTemplate {
    id: number;
    icon: string;
    title: string;
    amount: number;
    backgroundColor: string;
    textColor: string;
}

export interface ContainerProps {
    container: ContainerTemplate;
}

const Container: React.FC<ContainerProps> = ({ container }) => {
    const formattedValue = container.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return (
        <div className={`w-[352px] h-[136px] rounded-md px-8 pt-6 ${container.backgroundColor}`}>
            <div className='flex justify-between'>
                <div className={`${container.textColor} text-xl font-semibold`}>
                    {container.title}
                </div>
                <img src={container.icon} alt="Ícone" width={32} height={32} />
            </div>
            <div className={`${container.textColor} font-medium pt-4 text-3xl`}>
                {formattedValue}
            </div>
        </div>
    );
};

export default Container;
