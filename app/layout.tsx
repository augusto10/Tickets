import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import "./globals.css";
import AuthWrapper from "./components/AuthWrapper";
import { Container } from '@mantine/core';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Chamados Esplendor",
  description: "Gerenciamento de chamados para empresas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MantineProvider
          theme={{
            primaryColor: 'blue',
            fontFamily: inter.style.fontFamily,
            colors: {
              primary: [
                '#f0f9ff',
                '#e0f2fe',
                '#bae6fd',
                '#7dd3fc',
                '#38bdf8',
                '#0ea5e9',
                '#0284c7',
                '#0369a1',
                '#075985',
                '#0c4a6e',
              ],
              secondary: [
                '#f8fafc',
                '#f1f5f9',
                '#e2e8f0',
                '#cbd5e1',
                '#94a3b8',
                '#64748b',
                '#475569',
                '#334155',
                '#1e293b',
                '#0f172a',
              ],
            },
            components: {
              Button: {
                defaultProps: {
                  radius: 'md',
                  size: 'md',
                },
              },
              TextInput: {
                defaultProps: {
                  radius: 'md',
                  size: 'md',
                },
              },
              PasswordInput: {
                defaultProps: {
                  radius: 'md',
                  size: 'md',
                },
              },
            },
          }}
        >
          <AuthProvider>
            <AuthWrapper>
              <div className="flex flex-col min-h-screen">
                <header className="bg-white shadow-sm">
                  <Container size="xl" py="md">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold text-primary.6">
                        Sistema de Chamados Esplendor
                      </h1>
                    </div>
                  </Container>
                </header>
                <main className="flex-1">
                  <Container size="xl" py="xl">
                    <div className="flex flex-col gap-8">
                      {children}
                    </div>
                  </Container>
                </main>
              </div>
            </AuthWrapper>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
