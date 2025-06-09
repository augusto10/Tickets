'use client';

import { Container, Group, Text, Button, Burger, Drawer, Box, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconUser, IconLogout, IconSettings, IconDashboard } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  user?: any;
}

export default function MainLayout({ children, user }: MainLayoutProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogout = () => {
    // Implementar lógica de logout
    router.push('/auth/login');
  };

  const navigation = [
    { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
    { link: '/dashboard/tickets', label: 'Chamados', icon: IconUser },
    { link: '/dashboard/settings', label: 'Configurações', icon: IconSettings },
  ];

  const userNavigation = [
    { link: '/dashboard/profile', label: 'Perfil' },
    { link: '#', label: 'Configurações' },
    { link: '#', label: 'Ajuda' },
  ];

  return (
    <>
      <Box style={{ display: 'flex', minHeight: '100vh' }}>
        {user && (
          <Box style={{ width: 250 }}>
            <Box style={{ padding: '1rem' }}>
              {navigation.map((item) => (
                <Button
                  key={item.link}
                  component={Link}
                  href={item.link}
                  variant="subtle"
                  fullWidth
                  onClick={() => setActiveSection(item.link.split('/')[1])}
                  style={{
                    justifyContent: 'flex-start',
                    color: activeSection === item.link.split('/')[1] ? '#2563eb' : '#64748b',
                  }}
                >
                  <Group style={{ gap: '0.5rem' }}>
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </Group>
                </Button>
              ))}
              <Button
                onClick={handleLogout}
                variant="subtle"
                fullWidth
                style={{ justifyContent: 'flex-start' }}
              >
                <Group style={{ gap: '0.5rem' }}>
                  <IconLogout size={16} />
                  <span>Sair</span>
                </Group>
              </Button>
            </Box>
          </Box>
        )}

        <Box style={{ flex: 1, padding: '1rem' }}>
          <Group style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Group style={{ gap: '0.5rem' }}>
              <Burger opened={opened} onClick={toggle} size="sm" />
              <Title order={2}>Sistema de Chamados</Title>
            </Group>
            {user && (
              <Group style={{ gap: '0.5rem' }}>
                <Button variant="subtle" onClick={handleLogout} leftSection={<IconLogout size={16} />}>Sair</Button>
              </Group>
            )}
          </Group>

          <Drawer opened={opened} onClose={toggle} size="sm" padding="1rem">
            <Group style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
              <Title order={4}>Menu</Title>
              <Burger opened={opened} onClick={toggle} size="sm" />
            </Group>
            {navigation.map((item) => (
              <Button
                key={item.link}
                component={Link}
                href={item.link}
                variant="subtle"
                fullWidth
                onClick={() => setActiveSection(item.link.split('/')[1])}
                style={{
                  justifyContent: 'flex-start',
                  color: activeSection === item.link.split('/')[1] ? '#2563eb' : '#64748b',
                }}
              >
                <Group style={{ gap: '0.5rem' }}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Group>
              </Button>
            ))}
          </Drawer>

          <Container size="lg" style={{ marginTop: '1rem' }}>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
}
