import { AppShell, NavLink, ScrollArea, ThemeIcon, Text } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard, IconUsers, IconSettings, IconChartBar,
  IconShoppingCart, IconFileInvoice, IconBox, IconUsersGroup
} from '@tabler/icons-react';
import './PremiumSidebar.css';

interface NavLinkItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  color: string;
  subLinks?: { label: string; path: string }[];
}

interface SidebarProps {
  mobileOpened: boolean;
  toggleMobile: () => void;
}

export function PremiumSidebar({ mobileOpened, toggleMobile }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const links: NavLinkItem[] = [
    { icon: <IconDashboard size="1.2rem" stroke={1.5} />, label: 'Dashboard', path: '/dashboard', color: 'blue' },
    { icon: <IconChartBar size="1.2rem" stroke={1.5} />, label: 'Analytics', path: '/analytics', color: 'grape' },
    { icon: <IconShoppingCart size="1.2rem" stroke={1.5} />, label: 'E-Commerce', color: 'teal', subLinks: [
      { label: 'Orders', path: '/orders' },
      { label: 'Products', path: '/products' },
      { label: 'Customers', path: '/customers' },
    ]},
    { icon: <IconFileInvoice size="1.2rem" stroke={1.5} />, label: 'Invoices', path: '/invoices', color: 'cyan' },
    { icon: <IconUsers size="1.2rem" stroke={1.5} />, label: 'Users Management', path: '/users', color: 'indigo' },
    { icon: <IconBox size="1.2rem" stroke={1.5} />, label: 'Inventory', path: '/inventory', color: 'orange' },
    { icon: <IconUsersGroup size="1.2rem" stroke={1.5} />, label: 'Team', path: '/team', color: 'pink' },
    { icon: <IconSettings size="1.2rem" stroke={1.5} />, label: 'Settings', path: '/settings', color: 'gray' },
  ];

  return (
    <AppShell.Navbar p="md" className="premium-sidebar">
      <AppShell.Section grow component={ScrollArea}>
        <div className="nav-group">
          <Text c="dimmed" size="xs" fw={700} tt="uppercase" mb="sm" mt="md" pl="md">Overview</Text>
          {links.slice(0, 4).map((link) => renderLink(link, navigate, location, mobileOpened, toggleMobile))}

          <Text c="dimmed" size="xs" fw={700} tt="uppercase" mb="sm" mt="xl" pl="md">Management</Text>
          {links.slice(4).map((link) => renderLink(link, navigate, location, mobileOpened, toggleMobile))}
        </div>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function renderLink(link: NavLinkItem, navigate: any, location: any, mobileOpened: boolean, toggleMobile: () => void) {
  const hasActiveSub = link.subLinks?.some(sub => location.pathname === sub.path) || false;
  const isActive = location.pathname === link.path || (location.pathname === '/' && link.path === '/dashboard');

  const iconEl = (
    <ThemeIcon variant="light" color={link.color} size={30} radius="md">
      {link.icon}
    </ThemeIcon>
  );

  if (link.subLinks) {
    return (
      <NavLink
        key={link.label}
        label={<Text fw={500} size="sm">{link.label}</Text>}
        leftSection={iconEl}
        defaultOpened={hasActiveSub}
        className="premium-nav-link"
        childrenOffset={44}
      >
        <div className="premium-submenu">
          {link.subLinks.map((sub) => (
            <NavLink
              key={sub.label}
              active={location.pathname === sub.path}
              label={sub.label}
              className="premium-nav-sublink"
              onClick={() => {
                navigate(sub.path);
                if (mobileOpened) toggleMobile();
              }}
            />
          ))}
        </div>
      </NavLink>
    );
  }

  return (
    <NavLink
      key={link.label}
      active={isActive}
      label={<Text fw={500} size="sm">{link.label}</Text>}
      leftSection={iconEl}
      className="premium-nav-link"
      onClick={() => {
        if (link.path) navigate(link.path);
        if (mobileOpened) toggleMobile();
      }}
    />
  );
}