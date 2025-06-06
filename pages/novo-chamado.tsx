import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

const prisma = new PrismaClient();

interface Prioridade {
  value: string;
  label: string;
}

interface Status {
  value: string;
  label: string;
}

const PRIORIDADES: Prioridade[] = [
  { value: 'BAIXA', label: 'Baixa' },
  { value: 'MEDIA', label: 'Média' },
  { value: 'ALTA', label: 'Alta' },
];

const STATUS: Status[] = [
  { value: 'ABERTO', label: 'Aberto' },
  { value: 'EM_ANDAMENTO', label: 'Em Andamento' },
  { value: 'FINALIZADO', label: 'Finalizado' },
];

export default function NovoChamado() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('BAIXA');
  const [status, setStatus] = useState('ABERTO');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await prisma.Ticket.create({
        data: {
          titulo,
          descricao,
          status,
          prioridade,
          criadorId: user?.id || 1
        }
      });

      // Redirecionar para a página de chamados após criar
      window.location.href = '/chamados';
    } catch (err) {
      setError('Erro ao criar o chamado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="USUARIO">
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg bg-white">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Novo Chamado</h1>
                
                {error && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                      Título
                    </label>
                    <input
                      type="text"
                      id="titulo"
                      name="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                      Descrição
                    </label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">
                      Prioridade
                    </label>
                    <select
                      id="prioridade"
                      name="prioridade"
                      value={prioridade}
                      onChange={(e) => setPrioridade(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      {PRIORIDADES.map((prioridade) => (
                        <option key={prioridade.value} value={prioridade.value}>
                          {prioridade.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      {STATUS.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Criando...' : 'Criar Chamado'}
                  </button>

                  <div className="text-center">
                    <Link
                      href="/chamados"
                      className="text-sm text-blue-600 hover:text-blue-500 mt-4 block"
                    >
                      Voltar para a lista de chamados
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
}
