import React, { useState, useEffect } from 'react';
import { TransactionTemplate } from '../../pages/api/transactions';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: TransactionTemplate | null) => void;
  initialData?: TransactionTemplate | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [price, setPrice] = useState<number | ''>(initialData?.price || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [selected, setSelected] = useState<'entrada' | 'saida' | null>(initialData?.type || null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPrice(initialData.price);
      setCategory(initialData.category);
      setSelected(initialData.type);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || price === '' || !category || !selected) return;
  
    const newTransaction: TransactionTemplate = {
      id: initialData?.id || new Date().getTime().toString(),
      title,
      price,
      category,
      date: new Date().toLocaleDateString('pt-BR'),
      type: selected
    };
  
    onSubmit(newTransaction);
    setTitle('');
    setPrice('');
    setCategory('');
    setSelected(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden bg-background text-left shadow-xl transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-background px-8 pb-8 pt-16 sm:text-left relative">
            <button onClick={onClose} className="absolute right-4 top-4">
              &times;
            </button>
            <h1 className="text-xl font-semibold leading-6 text-title px-3">
              {initialData ? 'Editar Transação' : 'Cadastrar Transação'}
            </h1>
            <form className="mt-7 space-y-4 px-3" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-15 bg-fields py-4 appearance-none border border-[#D7D7D7] rounded-md px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  type="text"
                  placeholder="Nome"
                />
              </div>
              <div className="mb-4">
                <input
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-15 bg-fields py-4 appearance-none border border-[#D7D7D7] rounded-md px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  type="number"
                  placeholder="Preço"
                />
              </div>
              <div className="mb-4 flex gap-2">
                <div className="flex-1 flex justify-center items-center border-2 border-gray-200 rounded-md h-16">
                  <button
                    type="button"
                    className={`flex items-center justify-center w-full text-title font-medium rounded-sm px-4 py-2 h-full ${selected === 'entrada' ? 'bg-[#12A454] text-white' : 'bg-background'}`}
                    onClick={() => setSelected('entrada')}
                  >
                    <img src="/images/entradas.png" alt="Entrada Icon" className="w-6 h-6 mr-2" />
                    Entrada
                  </button>
                </div>
                <div className="flex-1 flex justify-center items-center border-2 border-gray-200 rounded-md h-16">
                  <button
                    type="button"
                    className={`flex items-center justify-center w-full text-title font-medium rounded-sm px-4 py-2 h-full ${selected === 'saida' ? 'bg-[#FF4C4C] text-white' : 'bg-background'}`}
                    onClick={() => setSelected('saida')}
                  >
                    <img src="/images/saídas.png" alt="Saída Icon" className="w-6 h-6 mr-2" />
                    Saída
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-15 bg-fields py-4 appearance-none border border-[#D7D7D7] rounded-md px-4 focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                  type="text"
                  placeholder="Categoria"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md text-white bg-submit px-3 h-16 py-2 text-sm font-medium hover:bg-gray-500"
              >
                {initialData ? 'Atualizar' : 'Cadastrar'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
