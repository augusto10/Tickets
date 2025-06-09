import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/logo-esplendor.svg"
                alt="Logo Esplendor"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center">
              <Link href="/auth" className="text-blue-600 hover:text-blue-800">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Chamados Esplendor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gerencie seus chamados de forma eficiente e organizada
          </p>
          
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Acessar Sistema
              </Link>
            </div>
          </div>
        </div>
      </main>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Cards */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Área do Usuário
                </h3>
                <p className="text-gray-600 mb-4">
                  Acesse seus chamados, acompanhe o status e envie novos pedidos
                </p>
                <Link
                  href="/auth"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Acessar Área do Usuário
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Suporte Técnico
                </h3>
                <p className="text-gray-600 mb-4">
                  Gerencie chamados, atenda solicitações e acompanhe métricas
                </p>
                <Link
                  href="/login"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Acessar Suporte
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Administração
                </h3>
                <p className="text-gray-600 mb-4">
                  Gerencie usuários, departamentos e configurações do sistema
                </p>
                <Link
                  href="/login"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Acessar Administração
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
