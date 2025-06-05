import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Departamentos iniciais
  const departamentos = [
    { nome: 'RH' },
    { nome: 'Logística' },
    { nome: 'Financeiro' },
    { nome: 'TI' },
    { nome: 'Comercial' }
  ];

  // Criando departamentos
  for (const departamento of departamentos) {
    await prisma.departamento.upsert({
      where: { nome: departamento.nome },
      update: {},
      create: {
        nome: departamento.nome
      }
    });
  }

  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
