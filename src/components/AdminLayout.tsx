import { AppShell, Burger, Group, NavLink, Title, useMantineColorScheme, ActionIcon, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard, IconUsers, IconSettings, IconSun, IconMoon,
  IconMap, IconMapPin, IconCategory, IconCalendarEvent,
  IconBook, IconStar, IconTicket, IconShoppingBag, IconReportAnalytics, IconPhone,
  IconChevronLeft, IconChevronRight, IconMenu2, IconChevronUp
} from '@tabler/icons-react';
import { ScrollArea } from '@mantine/core';
import './AdminLayout.css';

interface NavLinkItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  subLinks?: { label: string; path: string }[];
}

export function AdminLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopCollapsed, { toggle: toggleDesktopCollapsed }] = useDisclosure(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const links: NavLinkItem[] = [
    { icon: <IconDashboard size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <IconUsers size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Users', path: '/users' },
    { icon: <IconMap size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'State', path: '/state' },
    { icon: <IconMap size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'City', path: '/city' },
    { icon: <IconMapPin size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Venue', path: '/venue' },
    { icon: <IconCategory size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Category', path: '/category' },
    { icon: <IconCalendarEvent size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Event', path: '/event' },
    { icon: <IconBook size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Blog', path: '/blog' },
    { icon: <IconStar size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Event Sponsor', path: '/sponsor' },
    { icon: <IconStar size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Our Client', path: '/client' },
    { icon: <IconTicket size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Coupon Code', path: '/coupon' },
    { icon: <IconShoppingBag size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Order', path: '/order' },
    { icon: <IconReportAnalytics size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Sale Inventory Report', path: '/report' },
    { icon: <IconPhone size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Contact Us', path: '/contact' },
    { icon: <IconSettings size="1.2rem" stroke={1.5} className="admin-nav-icon" />, label: 'Settings', subLinks: [
        { label: 'App Settings', path: '/settings/app' },
        { label: 'Popup Image', path: '/settings/popup' },
    ]},
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: desktopCollapsed ? 80 : 250,
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
             <Text size="sm" c="blue" td="underline" style={{cursor: 'pointer'}}>Home</Text>
             <Text size="sm" c="dimmed">/ {links.find(l => l.path === location.pathname)?.label || 'Dashboard'}</Text>
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

      <AppShell.Navbar className={`admin-navbar ${desktopCollapsed ? 'collapsed' : ''}`} p={0}>
        <div className="admin-logo">
           {desktopCollapsed ? (
             <Text fw={700} c="white">F<span className="admin-logo-span">E</span></Text>
           ) : (
             <Text fw={700} c="white" fz="xl">Find E-<span className="admin-logo-span">Event</span></Text>
           )}
        </div>

        <AppShell.Section grow component={ScrollArea} type="always" scrollbars="y" className="admin-scroll-area">
          <div style={{ padding: desktopCollapsed ? '8px 0' : '0' }}>
            {links.map((link) => {
              const hasActiveSub = link.subLinks?.some(sub => location.pathname === sub.path) || false;

              if (link.subLinks) {
                return (
                  <NavLink
                    key={link.label}
                    label={link.label}
                    leftSection={link.icon}
                    defaultOpened={hasActiveSub}
                    className="admin-nav-link"
                    childrenOffset={0}
                    rightSection={
                      !desktopCollapsed && (
                        <IconChevronUp size="0.8rem" stroke={1.5} className="admin-nav-chevron" />
                      )
                    }
                  >
                    {!desktopCollapsed && <div className="admin-submenu">
                      {link.subLinks.map((sub) => (
                        <NavLink
                          key={sub.label}
                          active={location.pathname === sub.path}
                          label={sub.label}
                          className="admin-nav-link admin-nav-sublink"
                          onClick={() => {
                            navigate(sub.path);
                            if (mobileOpened) toggleMobile();
                          }}
                        />
                      ))}
                    </div>}
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={link.label}
                  active={location.pathname === link.path || (location.pathname === '/' && link.path === '/dashboard')}
                  label={link.label}
                  leftSection={link.icon}
                  className="admin-nav-link"
                  onClick={() => {
                    if (link.path) navigate(link.path);
                    if (mobileOpened) toggleMobile();
                  }}
                />
              );
            })}
          </div>
        </AppShell.Section>

        <button
          className="admin-collapse-btn"
          onClick={toggleDesktopCollapsed}
          aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {desktopCollapsed ? <IconChevronRight size="1.2rem" /> : <IconChevronLeft size="1.2rem" />}
        </button>
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#f4f6f8' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
