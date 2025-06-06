import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Buscando departamentos no banco...');
    const departments = await prisma.departamento.findMany();
    console.log('Departamentos encontrados:', departments);
    
    const response = departments.map(dept => ({
      id: dept.id.toString(),
      name: dept.nome
    }));
    console.log('Response:', response);
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Erro ao carregar departamentos:', error);
    return res.status(500).json({
      message: 'Erro ao carregar departamentos',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  } finally {
    await prisma.$disconnect();
  }
}
