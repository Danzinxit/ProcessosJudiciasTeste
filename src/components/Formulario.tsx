import React from 'react';
import { Case } from '../types';

interface CaseFormProps {
  onSubmit: (data: Omit<Case, 'id' | 'created_at'>) => void;
  initialData?: Case;
}

export function CaseForm({ onSubmit, initialData }: CaseFormProps) {
  const [formData, setFormData] = React.useState({
    case_number: initialData?.case_number || '',
    opened_at: initialData?.opened_at || '',
    description: initialData?.description || '',
    client: initialData?.client || '',
    lawyer: initialData?.lawyer || '',
    state: initialData?.state || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Número do Processo
        </label>
        <input
          type="text"
          required
          value={formData.case_number}
          onChange={(e) => setFormData({ ...formData, case_number: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

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

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialData ? 'Atualizar Processo' : 'Cadastrar Processo'}
      </button>
    </form>
  );
}