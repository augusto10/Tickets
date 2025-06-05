import React from 'react';
import { useState } from "react";
import FormInput from "../components/FormInput";
import Link from 'next/link';

interface LoginForm {
  email: string;
  senha: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", senha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm">
            <FormInput label="E-mail" name="email" value={form.email} onChange={handleChange} />
            <FormInput label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>
        <div className="text-center">
          <Link href="/cadastro" className="text-sm text-blue-600 hover:text-blue-500">
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
