'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button, Container, Box, Alert, TextInput, PasswordInput, Stack, Paper, Title, Text } from '@mantine/core';

export default function AuthPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  // Redireciona usuário logado para o painel correspondente
  useEffect(() => {
    if (user) {
      const redirectPath = user.tipo === 'ADMINISTRADOR' ? '/dashboard/admin' : '/dashboard/user';
      router.push(redirectPath);
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Credenciais inválidas');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box style={{ width: '100%', maxWidth: '400px' }}>
        <Paper p="xl" withBorder>
          <Stack gap="md">
            <Title order={2} ta="center" fw={700} c="primary.6">
              Sistema de Chamados Esplendor
            </Title>
            <Text size="sm" ta="center" c="dimmed" mb="md">
              Acesse sua conta para gerenciar seus chamados
            </Text>
            
            <form onSubmit={handleSubmit}>
              <TextInput
                label="Email"
                placeholder="Digite seu email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    '&:focus': {
                      borderColor: '#38bdf8',
                    },
                  },
                  label: {
                    color: '#64748b',
                  },
                }}
              />
              <PasswordInput
                label="Senha"
                placeholder="Digite sua senha"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                radius="md"
                size="md"
                styles={{
                  input: {
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    '&:focus': {
                      borderColor: '#38bdf8',
                    },
                  },
                  label: {
                    color: '#64748b',
                  },
                }}
              />
              {error && (
                <Alert
                  color="red"
                  title="Erro de autenticação"
                  withCloseButton
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
                radius="md"
                size="md"
                color="primary"
                styles={{
                  root: {
                    backgroundColor: '#0ea5e9',
                    '&:hover': {
                      backgroundColor: '#0284c7',
                    },
                    '&:disabled': {
                      backgroundColor: '#38bdf8',
                    },
                  },
                }}
              >
                {loading ? 'Acessando...' : 'Acessar'}
              </Button>
            </form>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
