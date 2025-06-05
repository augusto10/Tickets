import { useState } from 'react';
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

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState<CadastroForm>({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    departamento_id: "1"
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
      // Aqui você pode mostrar uma mensagem de erro ao usuário
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
            </div>
            <div>
              <FormInput label="E-mail" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <FormInput label="Senha" name="senha" type="password" value={formData.senha} onChange={handleChange} />
              {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha}</p>}
            </div>
            <div>
              <FormInput label="Confirmar Senha" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select
                name="departamento_id"
                value={formData.departamento_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="1">RH</option>
                <option value="2">Logística</option>
                <option value="3">Vendas</option>
                <option value="4">Compras</option>
                <option value="5">TI</option>
              </select>
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
