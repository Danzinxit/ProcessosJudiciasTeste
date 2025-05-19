import React from 'react';
import { Case } from '../types';

// Props do formulário
interface CaseFormProps {
  onSubmit: (data: Omit<Case, 'id' | 'created_at'>) => void;
  initialData?: Case;
}

// Componente principal
export function CaseForm({ onSubmit, initialData }: CaseFormProps) {
  // Estado inicial do formulário
  const [formData, setFormData] = React.useState({
    case_number: initialData?.case_number || '',
    opened_at: initialData?.opened_at || '',
    description: initialData?.description || '',
    client: initialData?.client || '',
    lawyer: initialData?.lawyer || '',
    state: initialData?.state || '',
  });

  // Manipulador do envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo de número do processo - aceita apenas números */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número do Processo
        </label>
        <input
          type="text"
          required
          pattern="[0-9]+"
          value={formData.case_number}
          onChange={(e) => setFormData({ ...formData, case_number: e.target.value.replace(/\D/g, '') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          title="Digite apenas números"
          inputMode="numeric"
        />
        <span className="text-xs text-red-500">
          Digite apenas números
        </span>
      </div>

      {/* Campo de data de abertura */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data de Abertura
        </label>
        <input
          type="date"
          required
          value={formData.opened_at}
          onChange={(e) => setFormData({ ...formData, opened_at: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Campo de descrição do processo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      {/* Campo de nome do cliente */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cliente
        </label>
        <input
          type="text"
          required
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Campo de nome do advogado */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Advogado
        </label>
        <input
          type="text"
          required
          value={formData.lawyer}
          onChange={(e) => setFormData({ ...formData, lawyer: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Campo de seleção de estado (UF) */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          UF
        </label>
        <select
          required
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecione um estado</option>
          {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {/* Botão de envio do formulário */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Atualizar Processo' : 'Cadastrar Processo'}
      </button>
    </form>
  );
}