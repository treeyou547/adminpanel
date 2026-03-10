import { AppShell, Burger, Group, NavLink, Title, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard, IconUsers, IconSettings, IconSun, IconMoon,
  IconFolder, IconChartBar, IconFileText, IconMail, IconCalendar,
  IconMessage, IconBell, IconLock, IconShield, IconHelp,
  IconBox, IconCreditCard
} from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';

interface NavLinkItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  subLinks?: { label: string; path: string }[];
}

export function AdminLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const links: NavLinkItem[] = [
    { icon: <IconDashboard size="1rem" stroke={1.5} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <IconFolder size="1rem" stroke={1.5} />, label: 'Quotation', subLinks: [
        { label: 'View Quotation', path: '/quotation/view' },
        { label: 'Discount Approval', path: '/quotation/discount-approval' },
    ]},
    { icon: <IconUsers size="1rem" stroke={1.5} />, label: 'Users', path: '/users' },
    { icon: <IconBox size="1rem" stroke={1.5} />, label: 'Inventory', subLinks: [
        { label: 'Stock Levels', path: '/inventory/stock' },
        { label: 'Restock Orders', path: '/inventory/restock' },
        { label: 'Suppliers', path: '/inventory/suppliers' },
    ]},
    { icon: <IconFileText size="1rem" stroke={1.5} />, label: 'Invoices', path: '/invoices' },
    { icon: <IconCreditCard size="1rem" stroke={1.5} />, label: 'Payments', path: '/payments' },
    { icon: <IconChartBar size="1rem" stroke={1.5} />, label: 'Reports', subLinks: [
        { label: 'Sales Report', path: '/reports/sales' },
        { label: 'Financial Report', path: '/reports/financial' },
    ]},
    { icon: <IconMail size="1rem" stroke={1.5} />, label: 'Email', path: '/email' },
    { icon: <IconCalendar size="1rem" stroke={1.5} />, label: 'Calendar', path: '/calendar' },
    { icon: <IconMessage size="1rem" stroke={1.5} />, label: 'Messages', path: '/messages' },
    { icon: <IconBell size="1rem" stroke={1.5} />, label: 'Notifications', path: '/notifications' },
    { icon: <IconLock size="1rem" stroke={1.5} />, label: 'Authentication', subLinks: [
        { label: 'Sign In', path: '/auth/signin' },
        { label: 'Sign Up', path: '/auth/signup' },
        { label: 'Reset Password', path: '/auth/reset' },
    ]},
    { icon: <IconShield size="1rem" stroke={1.5} />, label: 'Roles & Permissions', path: '/roles' },
    { icon: <IconHelp size="1rem" stroke={1.5} />, label: 'Help & Support', path: '/support' },
    { icon: <IconSettings size="1rem" stroke={1.5} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Title order={3}>Admin Panel</Title>
          </Group>
          <ActionIcon
            variant="default"
            onClick={() => toggleColorScheme()}
            size="lg"
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          {links.map((link) => {
            const hasActiveSub = link.subLinks?.some(sub => location.pathname === sub.path) || false;

            if (link.subLinks) {
              return (
                <NavLink
                  key={link.label}
                  label={link.label}
                  leftSection={link.icon}
                  defaultOpened={hasActiveSub}
                  childrenOffset={28}
                >
                  {link.subLinks.map((sub) => (
                    <NavLink
                      key={sub.label}
                      active={location.pathname === sub.path}
                      label={sub.label}
                      onClick={() => {
                        navigate(sub.path);
                        if (mobileOpened) toggleMobile();
                      }}
                    />
                  ))}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={link.label}
                active={location.pathname === link.path}
                label={link.label}
                leftSection={link.icon}
                onClick={() => {
                  if (link.path) navigate(link.path);
                  if (mobileOpened) toggleMobile();
                }}
              />
            );
          })}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
