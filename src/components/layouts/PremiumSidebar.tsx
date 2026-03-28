import { NavLink, Text, ScrollArea, Box, Collapse, UnstyledButton, Group, ThemeIcon } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconShoppingCart,
  IconShieldLock,
  IconUserCircle,
  IconChevronRight
} from '@tabler/icons-react';
import { useState } from 'react';

const mockLinks = [
  { label: 'Overview', heading: true },
  { icon: IconDashboard, label: 'Dashboard', link: '/' },
  { icon: IconChartBar, label: 'Analytics', link: '/analytics' },
  {
    icon: IconShoppingCart,
    label: 'E-Commerce',
    initiallyOpened: true,
    links: [
      { label: 'Products', link: '/products' },
      { label: 'Orders', link: '/orders' },
      { label: 'Customers', link: '/crm' },
    ],
  },
  { label: 'Management', heading: true },
  { icon: IconUsers, label: 'Users', link: '/users' },
  { icon: IconShieldLock, label: 'Roles', link: '/roles' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
  { icon: IconUserCircle, label: 'Profile', link: '/profile' },
];

export function PremiumSidebar({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const links = mockLinks.map((item, index) => {
    if (item.heading) {
      return (
        <Text
          key={`heading-${index}`}
          size="xs"
          fw={600}
          c="dimmed"
          tt="uppercase"
          mt="md"
          mb="xs"
          px="md"
        >
          {item.label}
        </Text>
      );
    }

    if (item.links) {
      return <LinksGroup key={item.label} {...item} onNavigate={handleNavigate} currentPath={location.pathname} />;
    }

    const isActive = location.pathname === item.link;

    return (
      <NavLink
        key={item.label}
        active={isActive}
        label={<Text size="sm" fw={500}>{item.label}</Text>}
        leftSection={
          item.icon ? (
            <ThemeIcon variant={isActive ? 'filled' : 'light'} size={30} color={isActive ? 'primary' : 'gray'}>
              <item.icon size={18} />
            </ThemeIcon>
          ) : null
        }
        onClick={() => handleNavigate(item.link || '/')}
        mb={4}
        className={isActive ? 'glass-morphism' : 'glass-morphism-button'}
        styles={(theme) => ({
          root: {
            borderRadius: theme.radius.md,
            padding: '10px 16px',
            backgroundColor: isActive ? 'var(--glass-bg-hover)' : 'transparent',
            color: isActive ? 'var(--mantine-color-primary-filled)' : 'var(--mantine-color-text)',
            border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
            '&:hover': {
              backgroundColor: 'var(--glass-bg-hover)',
            },
          },
        })}
      />
    );
  });

  return (
    <ScrollArea h="calc(100vh - 80px)">
      <Box pb="xl">{links}</Box>
    </ScrollArea>
  );
}

interface LinksGroupProps {
  icon: React.ElementType;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  onNavigate: (path: string) => void;
  currentPath: string;
}

function LinksGroup({ icon: Icon, label, initiallyOpened, links, onNavigate, currentPath }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const isActiveGroup = hasLinks ? links.some(l => currentPath === l.link || currentPath.startsWith(l.link + '/')) : false;

  const items = (hasLinks ? links : []).map((link) => {
    const isActive = currentPath === link.link;
    return (
      <Text<'a'>
        component="a"
        key={link.label}
        href={link.link}
        onClick={(event) => {
          event.preventDefault();
          onNavigate(link.link);
        }}
        size="sm"
        fw={isActive ? 600 : 500}
        c={isActive ? 'primary' : 'dimmed'}
        style={{
          display: 'block',
          textDecoration: 'none',
          padding: '8px 24px 8px 52px',
          backgroundColor: isActive ? 'var(--glass-bg-hover)' : 'transparent',
          backdropFilter: isActive ? 'blur(4px)' : 'none',
          border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
          borderRadius: 'var(--mantine-radius-md)',
          margin: '2px 0',
        }}
      >
        {link.label}
      </Text>
    );
  });

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        w="100%"
        p="xs"
        mb={4}
        style={() => ({
          borderRadius: 'var(--mantine-radius-md)',
          backgroundColor: isActiveGroup ? 'var(--glass-bg-hover)' : 'transparent',
          backdropFilter: isActiveGroup ? 'blur(4px)' : 'none',
          border: isActiveGroup ? '1px solid var(--glass-border)' : '1px solid transparent',
        })}
      >
        <Group justify="space-between" gap={0} wrap="nowrap">
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant={isActiveGroup ? 'filled' : 'light'} size={30} color={isActiveGroup ? 'primary' : 'gray'}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md"><Text size="sm" fw={500} c={isActiveGroup ? 'primary' : undefined}>{label}</Text></Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(90deg)` : 'none',
                transition: 'transform 200ms ease',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
