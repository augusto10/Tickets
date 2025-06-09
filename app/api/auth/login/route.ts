import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json();

    // Validação básica de email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Por favor, insira um email válido' },
        { status: 400 }
      );
    }

    // Validação básica de senha
    if (!senha || senha.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Exemplo de validação simples (substitua por sua lógica real)
    const usuarios = [
      { email: 'admin@example.com', senha: 'admin123', tipo: 'ADMINISTRADOR', nome: 'Administrador' },
      { email: 'user@example.com', senha: 'user123', tipo: 'USUARIO', nome: 'Usuário' }
    ];

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: usuario
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    );
  }
}
