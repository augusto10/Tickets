import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Gestão de Chamados
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Plataforma completa para gerenciamento de suporte técnico e atendimento ao cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/user-icon.svg"
                  alt="Área do Usuário"
                  width={64}
                  height={64}
                  className="mb-4"
                />
              </div>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Área do Usuário
              </h2>
              <p className="text-gray-600 mb-6">
                Abra chamados, acompanhe o status e comunique-se com nossa equipe de suporte
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Cadastrar
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/support-icon.svg"
                  alt="Área do Suporte"
                  width={64}
                  height={64}
                  className="mb-4"
                />
              </div>
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Área do Suporte
              </h2>
              <p className="text-gray-600 mb-6">
                Gerencie chamados, organize equipes e acompanhe métricas de atendimento
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Entrar
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recursos Principais</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/ticket-icon.svg"
                    alt="Abertura de Chamados"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Abertura de Chamados</h3>
                <p className="text-gray-600">Crie chamados com facilidade e acompanhe seu progresso em tempo real</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/priority-icon.svg"
                    alt="Priorização"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Priorização Inteligente</h3>
                <p className="text-gray-600">Seus chamados são priorizados automaticamente baseado na urgência</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/analytics-icon.svg"
                    alt="Relatórios"
                    width={48}
                    height={48}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Relatórios e Métricas</h3>
                <p className="text-gray-600">Acompanhe o desempenho do suporte e melhore continuamente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
