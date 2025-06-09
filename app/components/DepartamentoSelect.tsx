import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

export default function DepartamentoSelect({ value, onChange }: { value: number | null; onChange: (value: number) => void }) {
  const [departamentos, setDepartamentos] = useState<{
    value: number;
    label: string;
  }[]>([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const prisma = new Prisma();
      const deptos = await prisma.departamento.findMany();
      await prisma.$disconnect();
      setDepartamentos(
        deptos.map((depto) => ({
          value: depto.id,
          label: depto.nome,
        }))
      );
    };

    fetchDepartamentos();
  }, []);

  return (
    <Select
      label="Departamento"
      placeholder="Selecione um departamento"
      data={departamentos}
      value={value}
      onChange={onChange}
      required
      styles={(theme) => ({
        label: {
          color: theme.colors.blue[6],
          fontWeight: 500,
        },
        input: {
          backgroundColor: theme.colors.blue[50],
          borderColor: theme.colors.blue[300],
        },
      })}
    />
  );
}
