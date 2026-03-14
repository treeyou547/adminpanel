import { AppShell, Burger, Group, Title, useMantineColorScheme, ActionIcon, Avatar, Menu, UnstyledButton, Text, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { IconSun, IconMoon, IconBell, IconSettings, IconLogout, IconUser } from '@tabler/icons-react';
import { PremiumSidebar } from './PremiumSidebar';

export function AdminLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group wrap="nowrap">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Box ml="md">
              <Title order={3} fw={700} c="blue.6">NexGen Admin</Title>
            </Box>
          </Group>

          <Group wrap="nowrap" gap="sm">
            <ActionIcon variant="default" size="lg" aria-label="Notifications">
              <IconBell stroke={1.5} size={20} />
            </ActionIcon>

            <ActionIcon
              variant="default"
              size="lg"
              onClick={() => toggleColorScheme()}
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <IconSun stroke={1.5} size={20} /> : <IconMoon stroke={1.5} size={20} />}
            </ActionIcon>

            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar radius="xl" color="blue">AD</Avatar>
                  <div style={{ display: 'none' }} className="user-details">
                    <Text size="sm" fw={500}>Admin User</Text>
                    <Text size="xs" c="dimmed">admin@nexgen.com</Text>
                  </div>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={() => navigate('/login')}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <PremiumSidebar mobileOpened={mobileOpened} toggleMobile={toggleMobile} />

      <AppShell.Main bg={colorScheme === 'dark' ? 'dark.8' : 'gray.0'}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}