import React, { useState, useEffect, useContext } from 'react';
import { 
  Combobox, 
  Input, 
  Button, 
  Select, 
  Group, 
  Text, 
  Modal, 
  TextInput, 
  Textarea, 
  ComboboxProps, 
  ComboboxItem 
} from '@mantine/core';
import { prisma } from '../../lib/prisma';
import { useAuth } from '@app/contexts/AuthContext';
import { AuthUser } from '../types/auth';
import { StatusTicket, PrioridadeTicket } from '../types/ticket';
import { Prisma } from '@prisma/client';

interface Atendente {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  departamentoId: number;
}

interface AtendenteOption {
  value: string;
  label: string;
  data: Atendente;
}

export default function CriarChamado() {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState<PrioridadeTicket | null>(null);
  const [atendente, setAtendente] = useState<Atendente | null>(null);
  const [atendentes, setAtendentes] = useState<AtendenteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const [selectedAtendente, setSelectedAtendente] = useState<string | null>(null);

  const handleAtendenteSelect = (value: string | null) => {
    setSelectedAtendente(value);
    const selectedOption = atendentes.find(opt => opt.value === value);
    if (selectedOption) {
      setAtendente(selectedOption.data);
    } else {
      setAtendente(null);
    }
  };

  useEffect(() => {
    const fetchAtendentes = async () => {
      try {
        const atendentesData = await prisma.user.findMany({
          where: { tipo: 'ATENDENTE' },
          select: { id: true, nome: true, email: true, tipo: true, departamentoId: true }
        });
        const options = atendentesData.map((atendente: Atendente) => ({
          value: atendente.id.toString(),
          label: atendente.nome,
          data: atendente
        }));
        setAtendentes(options);
      } catch (error) {
        console.error('Erro ao buscar atendentes:', error);
      }
    };
    fetchAtendentes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error('Usuário não logado');
      return;
    }
    setLoading(true);
    try {
      await prisma.ticket.create({
        data: {
          titulo,
          descricao,
          prioridade: prioridade as PrioridadeTicket,
          criadorId: user!.id,
          atendenteId: atendente?.id || null,
          status: StatusTicket.ABERTO
        }
      });
      setOpened(false);
      setTitulo("");
      setDescricao("");
      setPrioridade(PrioridadeTicket.BAIXA);
      setAtendente(null);
    } catch (error) {
      console.error('Erro ao criar chamado:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        setTitulo("");
        setDescricao("");
        setPrioridade(PrioridadeTicket.BAIXA);
        setAtendente(null);
      }}
      title="Criar Novo Chamado"
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <TextInput
            label="Título"
            placeholder="Digite o título do chamado"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Textarea
            label="Descrição"
            placeholder="Descreva o problema"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <Select
            label="Prioridade"
            value={prioridade}
            onChange={(value: string | null) => {
              if (value) {
                setPrioridade(value as PrioridadeTicket);
              } else {
                setPrioridade(null);
              }
            }}
            data={['BAIXA', 'MEDIA', 'ALTA'].map(prioridade => ({
              value: prioridade,
              label: prioridade
            }))}
            required
          />
          <Select
            label="Atendente"
            placeholder="Selecione o atendente"
            value={selectedAtendente}
            onChange={(value: string | null) => {
              setSelectedAtendente(value);
              if (value) {
                const selectedOption = atendentes.find(opt => opt.value === value);
                if (selectedOption) {
                  setAtendente(selectedOption.data);
                }
              }
            }}
            data={atendentes.map(option => ({
              value: option.value,
              label: option.label
            }))}
            searchable
            required
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpened(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={loading}>
              Criar Chamado
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
