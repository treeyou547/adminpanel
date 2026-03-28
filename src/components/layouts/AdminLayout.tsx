import { AppShell, Burger, Group, Title, ActionIcon, useMantineColorScheme, TextInput, Menu, Avatar, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { PremiumSidebar } from './PremiumSidebar';
import { IconSun, IconMoonStars, IconSearch, IconBell, IconSettings, IconLogout, IconUser } from '@tabler/icons-react';

export function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header className="glass-morphism-header" style={{ borderBottom: 'none', zIndex: 100 }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="var(--mantine-color-text)" />
            <ActionIcon variant="transparent" size="lg" color="primary">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </ActionIcon>
            <Title order={3} c="primary.7">NexGen Admin</Title>
          </Group>

          <Group>
            <TextInput
              placeholder="Search..."
              leftSection={<IconSearch size={16} />}
              visibleFrom="sm"
              w={300}
              radius="md"
              className="glass-morphism-input"
            />

            <ActionIcon variant="default" size="lg" radius="md" className="glass-morphism-button">
              <IconBell size={20} stroke={1.5} />
            </ActionIcon>

            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size="lg"
              radius="md"
              className="glass-morphism-button"
            >
              {colorScheme === 'dark' ? (
                <IconSun size={20} stroke={1.5} />
              ) : (
                <IconMoonStars size={20} stroke={1.5} />
              )}
            </ActionIcon>

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={8}>
                    <Avatar color="primary" radius="xl">AD</Avatar>
                    <div style={{ display: 'none' }} className="user-details">
                      <Text size="sm" fw={500}>Admin User</Text>
                      <Text c="dimmed" size="xs">admin@nexgen.com</Text>
                    </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />} onClick={() => navigate('/profile')}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />} onClick={() => navigate('/settings')}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={() => navigate('/login')}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className="glass-morphism-nav" style={{ borderRight: 'none', zIndex: 99 }}>
        <PremiumSidebar onClose={toggle} />
      </AppShell.Navbar>

      <AppShell.Main bg="transparent" pt={80}>
        <Outlet />
      </AppShell.Main>

      <style>{`
        @media (min-width: 48em) {
          .user-details {
            display: block !important;
          }
        }
      `}</style>
    </AppShell>
  );
}
