import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { nome, email, senha, confirmPassword, departamento_id } = req.body;

    // Validações básicas
    if (!nome || !email || !senha || !confirmPassword || !departamento_id) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (senha !== confirmPassword) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    // Verifica se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Verifica se o departamento existe
    const departamento = await prisma.departamento.findUnique({
      where: { id: parseInt(departamento_id) }
    });

    if (!departamento) {
      return res.status(400).json({ message: 'Departamento não encontrado' });
    }

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        departamentoId: parseInt(departamento_id)
      }
    });

    // Remove a senha do objeto retornado
    const { senha: _, ...userData } = user;

    return res.status(201).json(userData);
  } catch (error) {
    console.error('Erro no cadastro:', error);
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
}
