/**
 * Componente de Login do sistema
 * 
 * Este componente é responsável por:
 * - Exibir o formulário de login
 * - Validar e processar as credenciais do usuário
 * - Gerenciar erros de autenticação
 * - Redirecionar após login bem-sucedido
 */
import React from 'react';
import { useState } from "react";
import FormInput from "../components/FormInput";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginForm {
  email: string;
  senha: string;
}

export default function Login() {
  // Estado para gerenciar os campos do formulário
  const [form, setForm] = useState<LoginForm>({ email: "", senha: "" });
  // Estado para gerenciar mensagens de erro
  const [error, setError] = useState<string | null>(null);
  // Hook do Next.js para navegação
  const router = useRouter();
  // Hook do contexto de autenticação
  const { login } = useAuth();

  /**
   * Função para atualizar os campos do formulário
   * @param e - Evento de mudança do input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpa erros ao digitar
    setError(null);
  };

  /**
   * Função para processar o envio do formulário
   * @param e - Evento de submissão do formulário
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validar campos obrigatórios
      if (!form.email) {
        throw new Error('Email é obrigatório');
      }
      if (!form.senha) {
        throw new Error('Senha é obrigatória');
      }

      // Realizar login
      await login(form.email, form.senha);
      
      // Redirecionar para a página inicial após login bem-sucedido
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <div className="text-sm text-red-700">
              {error}
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <FormInput
              label="Senha"
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
