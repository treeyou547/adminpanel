import { AppShell, NavLink, Text } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard, IconUsers, IconSettings,
  IconMap, IconMapPin, IconCategory, IconCalendarEvent,
  IconBook, IconStar, IconTicket, IconShoppingBag, IconReportAnalytics, IconPhone,
  IconChevronLeft, IconChevronRight, IconChevronUp
} from '@tabler/icons-react';
import './Sidebar.css';

interface NavLinkItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  subLinks?: { label: string; path: string }[];
}

interface SidebarProps {
  mobileOpened: boolean;
  desktopCollapsed: boolean;
  toggleMobile: () => void;
  toggleDesktopCollapsed: () => void;
}

export function Sidebar({ mobileOpened, desktopCollapsed, toggleMobile, toggleDesktopCollapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

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
  );
}