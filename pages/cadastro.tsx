import React, { useState, useEffect } from 'react';
import FormInput from '../components/FormInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CadastroForm {
  nome: string;
  email: string;
  senha: string;
  confirmPassword: string;
  departamento_id: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Departamento {
  id: string;
  name: string;
}

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState<CadastroForm>({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    departamento_id: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [departments, setDepartments] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/departamentos');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
          console.log('Departamentos carregados:', data);
        }
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      hasErrors = true;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email inválido';
      hasErrors = true;
    }

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
      hasErrors = true;
    }

    if (!formData.senha.trim()) {
      newErrors.senha = 'Senha é obrigatória';
      hasErrors = true;
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve ter pelo menos 6 caracteres';
      hasErrors = true;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      hasErrors = true;
    } else if (formData.senha !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Limpa o formulário após o cadastro bem-sucedido
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmPassword: '',
        departamento_id: '1'
      });
      setErrors({});
      
      // Redireciona para a página de login
      router.push('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error instanceof Error) {
        setErrors({ message: error.message });
      } else {
        setErrors({ message: 'Erro desconhecido ao cadastrar' });
      }
    } finally {
      // Limpa o formulário após qualquer erro
      setFormData({
        nome: '',
        email: '',
        senha: '',
        confirmPassword: '',
        departamento_id: '1'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Cadastro</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <FormInput label="Nome" name="nome" value={formData.nome} onChange={handleChange} />
              {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select
                name="departamento_id"
                value={formData.departamento_id}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">Selecione um departamento</option>
                {loading ? (
                  <option value="">Carregando departamentos...</option>
                ) : departments.length === 0 ? (
                  <option value="">Nenhum departamento encontrado</option>
                ) : (
                  departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))
                )}
              </select>
              {errors.departamento_id && (
                <p className="text-red-500 text-sm mt-1">{errors.departamento_id}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cadastrar
          </button>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-sm text-green-600 hover:text-green-500">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
