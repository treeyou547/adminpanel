import { AppShell, Burger, Group, Title, useMantineColorScheme, ActionIcon, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useLocation } from 'react-router-dom';
import {
  IconSun, IconMoon, IconMenu2
} from '@tabler/icons-react';
import { Sidebar } from './Sidebar';

export function AdminLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopCollapsed, { toggle: toggleDesktopCollapsed }] = useDisclosure(false);

  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { base: 250, sm: desktopCollapsed ? 80 : 250 },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#fff', borderBottom: '1px solid #eee' }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <ActionIcon variant="transparent" color="gray" onClick={toggleDesktopCollapsed} visibleFrom="sm" size="lg">
              <IconMenu2 stroke={1.5} />
            </ActionIcon>
            <Title order={4} fw={400} c="dimmed">Dashboard</Title>
          </Group>
          <Group>
             <Text size="sm" c="blue" td="underline" visibleFrom="sm" style={{cursor: 'pointer'}}>Home</Text>
             <Text size="sm" c="dimmed" tt="capitalize" visibleFrom="sm">/ {location.pathname.replace('/', '') || 'Dashboard'}</Text>
             <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size="lg"
              aria-label="Toggle color scheme"
              ml="md"
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <Sidebar
        mobileOpened={mobileOpened}
        desktopCollapsed={desktopCollapsed}
        toggleMobile={toggleMobile}
        toggleDesktopCollapsed={toggleDesktopCollapsed}
      />

      <AppShell.Main style={{ backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#f4f6f8' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
