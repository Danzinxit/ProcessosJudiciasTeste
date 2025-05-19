// Importações necessárias
import React, { useState } from 'react';
import { PlusCircle, ArrowLeft, Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Case, CaseUpdate } from '../types';
import { CaseForm } from '../components/Formulario';
import { UpdateForm } from '../components/AtualizacaoFormulario';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componente principal da página Home
export default function Home() {
  // Estados do componente
  const [cases, setCases] = React.useState<Case[]>([]);
  const [updates, setUpdates] = React.useState<Record<string, CaseUpdate[]>>({});
  const [showForm, setShowForm] = React.useState(false);
  const [editingCase, setEditingCase] = React.useState<Case | null>(null);
  const [expandedCase, setExpandedCase] = React.useState<string | null>(null);
  const [editingUpdate, setEditingUpdate] = useState<CaseUpdate | null>(null);

  // Carrega os processos ao iniciar
  React.useEffect(() => {
    fetchCases();
  }, []);

  // Funções de manipulação dos processos
  const fetchCases = async () => {
    const { data } = await supabase.from('cases').select('*').order('created_at', { ascending: false });
    if (data) setCases(data);
  };

  const fetchUpdates = async (caseId: string) => {
    const { data } = await supabase
      .from('case_updates')
      .select('*')
      .eq('case_id', caseId)
      .order('date', { ascending: false });
    if (data) setUpdates(prev => ({ ...prev, [caseId]: data }));
  };

  const handleCreateCase = async (data: Omit<Case, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('cases').insert(data);
    if (!error) {
      fetchCases();
      setShowForm(false);
      toast.success(
        data.state === 'MG'
          ? 'Processo de MG criado com sucesso!'
          : 'Processo fora de MG criado com sucesso!'
      );
    } else {
      toast.error(`Erro ao criar processo: ${error.message}`);
    }
  };

  const handleUpdateCase = async (data: Omit<Case, 'id' | 'created_at'>) => {
    if (!editingCase) return;
    const { error } = await supabase.from('cases').update(data).eq('id', editingCase.id);
    if (!error) {
      fetchCases();
      setEditingCase(null);
      toast.success('Processo atualizado com sucesso!');
    } else {
      toast.error(`Erro ao atualizar processo: ${error.message}`);
    }
  };

  const handleDeleteCase = async (id: string) => {
    toast.info(
      <span>
        Tem certeza que deseja excluir este processo?
        <button
          className="ml-4 px-2 py-1 bg-red-600 text-white rounded"
          onClick={async () => {
            const { error } = await supabase.from('cases').delete().eq('id', id);
            if (!error) {
              fetchCases();
              toast.success('Processo excluído com sucesso!');
            } else {
              toast.error(`Erro ao excluir processo: ${error.message}`);
            }
            toast.dismiss();
          }}
        >
          Excluir
        </button>
        <button
          className="ml-2 px-2 py-1 bg-gray-300 rounded"
          onClick={() => toast.dismiss()}
        >
          Cancelar
        </button>
      </span>,
      { autoClose: false }
    );
  };

  // Funções de manipulação dos andamentos
  const handleCreateUpdate = async (data: Omit<CaseUpdate, 'id' | 'created_at'>) => {
    const { error } = await supabase.from('case_updates').insert(data);
    if (!error) {
      fetchUpdates(data.case_id);
      toast.success('Andamento adicionado com sucesso!');
    } else {
      toast.error(`Erro ao adicionar andamento: ${error.message}`);
    }
  };

  const handleUpdateUpdate = async (data: Omit<CaseUpdate, 'created_at'>) => {
    if (!editingUpdate) return;
    const { error } = await supabase
      .from('case_updates')
      .update({ ...data })
      .eq('id', editingUpdate.id);
    if (!error) {
      fetchUpdates(editingUpdate.case_id);
      setEditingUpdate(null);
      toast.success('Andamento atualizado com sucesso!');
    } else {
      toast.error(`Erro ao atualizar andamento: ${error.message}`);
    }
  };

  const handleDeleteUpdate = async (updateId: string, caseId: string) => {
    toast.info(
      <span>
        Tem certeza que deseja excluir este andamento?
        <button
          className="ml-4 px-2 py-1 bg-red-600 text-white rounded"
          onClick={async () => {
            const { error } = await supabase.from('case_updates').delete().eq('id', updateId);
            if (!error) {
              fetchUpdates(caseId);
              toast.success('Andamento excluído com sucesso!');
            } else {
              toast.error(`Erro ao excluir andamento: ${error.message}`);
            }
            toast.dismiss();
          }}
        >
          Excluir
        </button>
        <button
          className="ml-2 px-2 py-1 bg-gray-300 rounded"
          onClick={() => toast.dismiss()}
        >
          Cancelar
        </button>
      </span>,
      { autoClose: false }
    );
  };

  // Funções auxiliares
  const toggleExpand = (caseId: string) => {
    if (expandedCase === caseId) {
      setExpandedCase(null);
    } else {
      setExpandedCase(caseId);
      fetchUpdates(caseId);
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setEditingCase(null);
  };

  // Renderização do componente
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Cabeçalho */}
        <header className="mb-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-2 tracking-tight">Processos Judiciais</h1>
          <p className="text-gray-500 text-lg">Gerencia os processos</p>
        </header>

        {/* Botão de novo processo */}
        <div className="flex justify-end mb-6">
          {!showForm && !editingCase && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition"
            >
              <PlusCircle className="h-5 w-5" />
              Novo Processo
            </button>
          )}
        </div>

        {/* Formulário de processo */}
        {(showForm || editingCase) && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-indigo-100">
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="mr-3 text-indigo-500 hover:text-indigo-700 flex items-center"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Voltar
              </button>
              <span className="text-xl font-semibold text-indigo-700">
                {editingCase ? 'Editar Processo' : 'Novo Processo'}
              </span>
            </div>
            <CaseForm
              onSubmit={editingCase ? handleUpdateCase : handleCreateCase}
              initialData={editingCase || undefined}
            />
          </div>
        )}

        {/* Lista de processos */}
        {!showForm && !editingCase && (
          <ul className="space-y-6">
            {cases.map((case_) => (
              <li key={case_.id}>
                {/* Card do processo */}
                <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100 transition hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    {/* Informações do processo */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-700 font-bold text-lg">{case_.case_number}</span>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700  font-semibold">{case_.state}</span>
                      </div>
                      <div className="text-gray-500 text-sm mb-2">{case_.client} • {case_.lawyer}</div>
                      <div className="text-gray-400 text-xs">
                        Aberto em {case_.opened_at.split('-').reverse().join('/')}
                      </div>
                    </div>
                    {/* Botões de ação */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCase(case_)}
                        className="p-2 rounded-full hover:bg-indigo-50 text-yellow-600 transition"
                        title="Editar"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCase(case_.id)}
                        className="p-2 rounded-full hover:bg-red-50 text-red-600 transition"
                        title="Excluir"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => toggleExpand(case_.id)}
                        className="p-2 rounded-full hover:bg-indigo-50 text-indigo-600 transition"
                        title={expandedCase === case_.id ? "Fechar" : "Ver andamentos"}
                      >
                        {expandedCase === case_.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Seção de andamentos */}
                  {expandedCase === case_.id && (
                    <div className="mt-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Andamentos</h3>
                        <UpdateForm
                          key={editingUpdate && editingUpdate.case_id === case_.id ? editingUpdate.id : `new-${case_.id}`}
                          onSubmit={editingUpdate && editingUpdate.case_id === case_.id ? handleUpdateUpdate : handleCreateUpdate}
                          caseId={case_.id}
                          initialData={editingUpdate && editingUpdate.case_id === case_.id ? editingUpdate : undefined}
                        />
                      </div>
                      {/* Lista de andamentos */}
                      <div className="space-y-3">
                        {updates[case_.id]?.length === 0 && (
                          <div className="text-gray-400 text-sm">Nenhum andamento cadastrado.</div>
                        )}
                        {updates[case_.id]?.map((update) => (
                          <div key={update.id} className="flex justify-between items-start p-4 bg-indigo-50 rounded-xl">
                            <div>
                              <p className="text-xs text-indigo-600 font-semibold">
                                {update.date.split('-').reverse().join('/')}
                              </p>
                              <p className="mt-1 text-sm text-gray-700">{update.description}</p>
                            </div>
                            {/* Botões de ação do andamento */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingUpdate(update)}
                                className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition"
                                title="Editar andamento"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUpdate(update.id, case_.id)}
                                className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                                title="Excluir andamento"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {/* Mensagem quando não há processos */}
            {cases.length === 0 && (
              <div className="text-center text-gray-400 py-16 text-lg">
                Nenhum processo cadastrado ainda.
              </div>
            )}
          </ul>
        )}
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </div>
  );
}