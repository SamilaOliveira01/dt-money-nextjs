import React from 'react';

export interface ContainerTemplate {
    id: number,
    icon: string,
    title: string,
    amount: string,
    backgroundColor: string,
    textColor: string,
}

export interface ContainerProps {
    container: ContainerTemplate
}


const Container: React.FC<ContainerProps> = ({container}) => {
    const formattedValue = parseFloat(container.amount).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return (
        
        <div className={`w-[352px] h-[136px] rounded-md px-8 pt-6 ${container.backgroundColor}`} >
            <div className='flex justify-between'>
                <div className={`${container.textColor}`}>{container.title}</div>
                <img src={container.icon} alt="Ícone" width={32} height={32}/>
            </div>
            <div className={`${container.textColor} font-medium pt-4 text-3xl`}>R$ {`${formattedValue}`}</div>
        </div>
    );
};

export default Container;
