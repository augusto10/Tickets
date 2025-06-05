import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Painel de Tickets</h1>
        <div className="space-y-4">
          <Link href="/login" className="text-blue-600 hover:text-blue-500">
            Ir para Login
          </Link>
          <Link href="/cadastro" className="text-green-600 hover:text-green-500">
            Ir para Cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}
