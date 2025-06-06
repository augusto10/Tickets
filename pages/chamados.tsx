import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

const prisma = new PrismaClient();

interface Ticket {
  id: number;
  titulo: string;
  descricao: string;
  status: string;
  prioridade: string;
  criador: {
    nome: string;
  };
  createdAt: Date;
}

export default function Chamados() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await prisma.Ticket.findMany({
          include: {
            criador: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        setTickets(tickets);
      } catch (err) {
        setError('Erro ao carregar os chamados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Carregando chamados...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg bg-white">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Chamados</h1>
                  <Link
                    href="/novo-chamado"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Novo Chamado
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{ticket.titulo}</h3>
                            <p className="mt-2 text-sm text-gray-500">{ticket.descricao}</p>
                            <div className="mt-4 flex space-x-4">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                ticket.status === 'ABERTO' ? 'bg-blue-100 text-blue-800' :
                                ticket.status === 'EM_ANDAMENTO' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {ticket.status}
                              </span>
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                ticket.prioridade === 'BAIXA' ? 'bg-green-100 text-green-800' :
                                ticket.prioridade === 'MEDIA' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {ticket.prioridade}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                              Criado por: {ticket.criador.nome}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Data: {new Date(ticket.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
}
}
