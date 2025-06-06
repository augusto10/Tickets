import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/logo-esplendor.png"
              alt="Esplendor Atacadista"
              width={200}
              height={100}
              className="mx-auto mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sistema de Abertura de Chamados
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Esplendor Atacadista - Suporte e Gestão de Chamados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                Área do Usuário
              </h2>
              <p className="text-gray-600 mb-6">
                Área para abertura e acompanhamento de chamados
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                Área do Suporte
              </h2>
              <p className="text-gray-600 mb-6">
                Área para atendimento e resolução de chamados
              </p>
              <div className="flex justify-center">
                <Link
                  href="/login"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Entrar como Suporte
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
