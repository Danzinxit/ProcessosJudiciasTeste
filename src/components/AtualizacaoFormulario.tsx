import React, { useEffect, useState } from 'react';
import { CaseUpdate } from '../types';

interface UpdateFormProps {
  onSubmit: (data: Omit<CaseUpdate, 'id' | 'created_at'>) => void;
  caseId: string;
  initialData?: Partial<Omit<CaseUpdate, 'id' | 'created_at'>>;
}

export function UpdateForm({ onSubmit, caseId, initialData }: UpdateFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    case_id: caseId,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date || '',
        description: initialData.description || '',
        case_id: caseId,
      });
    } else {
      setFormData({
        date: '',
        description: '',
        case_id: caseId,
      });
    }
  }, [initialData, caseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ ...formData, date: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data
        </label>
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Adicionar Andamento
      </button>
    </form>
  );
}