import { useEffect, useState } from 'react';
import { Card, Title, Text } from '@mantine/core';
import { useAuth } from '@contexts/AuthContext';
import CriarChamado from '@app/components/CriarChamado';
import { prisma } from '../../../lib/prisma';
import { StatusTicket, PrioridadeTicket } from '@prisma/client';

interface ChamadoPendente {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: PrioridadeTicket;
  status: StatusTicket;
  createdAt: Date;
  criador: {
    nome: string;
    departamento: {
      nome: string;
    };
  };
  atendente?: {
    nome: string;
  };
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [chamadosPendentes, setChamadosPendentes] = useState<ChamadoPendente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.tipo !== 'ADMINISTRADOR') {
      return;
    }

    const fetchChamados = async () => {
      try {
        const chamados = await prisma.ticket.findMany({
          where: { status: StatusTicket.ABERTO },
          include: {
            criador: {
              include: { departamento: true }
            },
            atendente: true
          }
        });
        
        const chamadosFormatados = chamados.map(chamado => ({
          id: chamado.id,
          titulo: chamado.titulo,
          descricao: chamado.descricao,
          prioridade: chamado.prioridade,
          status: chamado.status,
          createdAt: chamado.createdAt,
          criador: {
            nome: chamado.criador.nome,
            departamento: {
              nome: chamado.criador.departamento.nome
            }
          },
          atendente: chamado.atendente ? { nome: chamado.atendente.nome } : undefined
        }));

        setChamadosPendentes(chamadosFormatados);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar chamados:', error);
        setLoading(false);
      }
    };

    fetchChamados();
  }, [user]);

  if (user?.tipo !== 'ADMINISTRADOR') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Carregando chamados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Chamados Pendentes</h1>
            <CriarChamado />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chamadosPendentes.map((chamado) => (
              <Card key={chamado.id}>
                <Title order={3}>{chamado.titulo}</Title>
                <Text color="dimmed" size="sm" mb="sm">
                  {chamado.criador.nome} - {chamado.criador.departamento.nome}
                </Text>
                <Text size="sm" mb="sm">
                  {chamado.descricao}
                </Text>
                <Text size="sm" mb="sm">
                  Prioridade: {chamado.prioridade}
                </Text>
                {chamado.atendente && (
                  <Text size="sm" mb="sm">
                    Atendente: {chamado.atendente.nome}
                  </Text>
                )}
                <Text size="sm" color="dimmed">
                  Criado em: {new Date(chamado.createdAt).toLocaleDateString()}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
