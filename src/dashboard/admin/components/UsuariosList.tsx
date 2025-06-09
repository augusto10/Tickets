import { Table, Group, Text, Badge, Button } from "@mantine/core";
import { useAuth } from "@/contexts/AuthContext";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import { User, TipoUsuario, Departamento } from "@prisma/client";

interface UsuarioComDepartamento {
  id: number;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  departamentoId: number;
  departamento: Departamento;
  createdAt: Date;
  updatedAt: Date;
}

const prisma = new PrismaClient();

export default function UsuariosList() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState<UsuarioComDepartamento[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (user?.tipo === "ADMINISTRADOR") {
        const usuarios = await prisma.user.findMany({
          include: {
            departamento: true,
          },
        });
        setUsuarios(usuarios);
      }
    };

    fetchUsuarios();
  }, [user]);

  const handleAtualizarTipo = async (id: number, novoTipo: TipoUsuario) => {
    if (user?.tipo === "ADMINISTRADOR") {
      try {
        await prisma.user.update({
          where: { id },
          data: { tipo: novoTipo },
        });
        const usuariosAtualizados = await prisma.user.findMany({
          include: { departamento: true },
        });
        setUsuarios(usuariosAtualizados);
      } catch (error) {
        console.error("Erro ao atualizar tipo do usuário:", error);
      }
    }
  };

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Departamento</Table.Th>
          <Table.Th>Tipo</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {usuarios.map((usuario) => (
          <Table.Tr key={usuario.id}>
            <Table.Td>{usuario.nome}</Table.Td>
            <Table.Td>{usuario.email}</Table.Td>
            <Table.Td>{usuario.departamento?.nome}</Table.Td>
            <Table.Td>
              <Badge color="blue">{usuario.tipo}</Badge>
            </Table.Td>
            <Table.Td>
              <Group>
                <Button
                  variant="outline"
                  color="blue"
                  size="xs"
                  onClick={() => handleAtualizarTipo(usuario.id, "ATENDENTE")}
                >
                  Atendente
                </Button>
                <Button
                  variant="outline"
                  color="green"
                  size="xs"
                  onClick={() => handleAtualizarTipo(usuario.id, "ADMINISTRADOR")}
                >
                  Admin
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
