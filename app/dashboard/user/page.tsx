import Link from 'next/link';
import { useAuth } from '@contexts/AuthContext';
import { TipoUsuario } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

export default function UserDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Acesso Negado</h1>
          <p className="mt-4 text-gray-600">Você não tem permissão para acessar esta página.</p>
          <Link
            href="/login"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar para Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-surface shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">Voltar</span>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Painel do Usuário</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">{user.nome}</span>
              <Link
                href="/login"
                className="btn-primary"
              >
                Sair
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="card">
              <CardHeader>
                <CardTitle>Seus Chamados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-gray-900">
                  12
                </div>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Chamados Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-gray-900">
                  5
                </div>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader>
                <CardTitle>Novo Chamado</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="/chamados/novo"
                  className="btn-primary w-full"
                >
                  Criar Novo
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Meus Chamados
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Sistema não inicia
                        </h4>
                        <p className="text-sm text-gray-500">
                          Status: Em Andamento
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Prioridade Alta
                        </span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          Impressão não funciona
                        </h4>
                        <p className="text-sm text-gray-500">
                          Status: Pendente
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Prioridade Média
                        </span>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Seus Chamados Recentes</h3>
                <div className="mt-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>Status</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#001</td>
                        <td>Problema com impressão</td>
                        <td>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Resolvido
                          </span>
                        </td>
                        <td>09/06/2025</td>
                      </tr>
                      <tr>
                        <td>#002</td>
                        <td>Erro no sistema</td>
                        <td>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Em Análise
                          </span>
                        </td>
                        <td>08/06/2025</td>
                      </tr>
                      <tr>
                        <td>#003</td>
                        <td>Internet lenta</td>
                        <td>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Em Andamento
                          </span>
                        </td>
                        <td>07/06/2025</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
