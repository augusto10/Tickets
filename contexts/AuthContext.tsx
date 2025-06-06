/**
 * Contexto de Autenticação do Sistema
 * 
 * Este contexto gerencia o estado de autenticação do usuário e fornece
 * funcionalidades para login, logout e verificação de permissões.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrismaClient } from '@prisma/client';
import { User, TipoUsuario } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Interface que define o tipo do usuário autenticado
 */
interface AuthUser {
  id: number;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  departamentoId: number;
}

/**
 * Interface que define o tipo do contexto de autenticação
 */
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  register: (nome: string, email: string, senha: string, departamentoId: number) => Promise<void>;
}

/**
 * Contexto React para gerenciamento de autenticação
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider do contexto de autenticação
 * @param {children} children - Componentes filhos que usarão o contexto
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estado para armazenar o usuário atual
  const [user, setUser] = useState<AuthUser | null>(null);
  // Estado para indicar se está carregando
  const [loading, setLoading] = useState(true);
  // Estado para armazenar erros
  const [error, setError] = useState<string | null>(null);

  // Método para registrar um novo usuário
  const register = async (nome: string, email: string, senha: string, departamentoId: number) => {
    try {
      setLoading(true);
      setError(null);

      // Verificar se o email já existe
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new Error('Este email já está em uso');
      }

      // Criar o novo usuário
      const newUser = await prisma.user.create({
        data: {
          nome,
          email,
          senha: senha, // Em produção, use uma função de hash para a senha
          tipo: TipoUsuario.USUARIO,
          departamentoId
        }
      });

      // Autenticar automaticamente após o registro
      await login(email, senha);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao registrar usuário');
    } finally {
      setLoading(false);
    }
  };
  // Hook para navegação
  const router = useRouter();

  /**
   * Efeito para verificar token no localStorage ao carregar
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.tipo === 'USUARIO' || parsedUser.tipo === 'ATENDENTE') {
          setUser(parsedUser);
        }
      }
    }
    setLoading(false);
  }, []);

  /**
   * Função para realizar login
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   */
  const login = async (email: string, senha: string) => {
    try {
      // Busca usuário no banco de dados
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          nome: true,
          email: true,
          senha: true,
          tipo: true,
          departamentoId: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Verificação de senha (implementar bcrypt)
      if (user.senha !== senha) {
        throw new Error('Senha incorreta');
      }

      // Geração e armazenamento do token
      const jwtToken = 'your-jwt-token'; // Implementar JWT
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo as 'USUARIO' | 'ATENDENTE',
        departamentoId: user.departamentoId
      }));
      setUser({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo as 'USUARIO' | 'ATENDENTE',
        departamentoId: user.departamentoId
      });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Verificação de senha (implementar bcrypt)
      if (user.senha !== senha) {
        throw new Error('Senha incorreta');
      }

      // Geração e armazenamento do token
      const token = 'your-jwt-token'; // Implementar JWT
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo as 'USUARIO' | 'ATENDENTE',
        departamentoId: user.departamentoId
      }));
      setUser({
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo as 'USUARIO' | 'ATENDENTE',
        departamentoId: user.departamentoId
      });
      // Redireciona para página de chamados
      router.push('/chamados');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    }
  };

  /**
   * Função para realizar logout
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para usar o contexto de autenticação
 * @returns {AuthContextType} - Estado e funções do contexto
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
