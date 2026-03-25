import {
  NavLink,
  Text,
  ScrollArea,
  Box,
  Collapse,
  UnstyledButton,
  Group,
  ThemeIcon,
  Tooltip,
  Menu,
} from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconShoppingCart,
  IconShieldLock,
  IconUserCircle,
  IconChevronRight,
  IconCircleFilled,
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';

interface LinkItem {
  label: string;
  link?: string;
  icon?: any;
  heading?: boolean;
  initiallyOpened?: boolean;
  links?: LinkItem[];
}

const mockLinks: LinkItem[] = [
  { label: 'Overview', heading: true },
  { icon: IconDashboard, label: 'Dashboard', link: '/' },
  { icon: IconChartBar, label: 'Analytics', link: '/analytics' },
  {
    icon: IconShoppingCart,
    label: 'E-Commerce',
    initiallyOpened: true,
    links: [
      {
        label: 'Products',
        link: '/products',
        links: [
          { label: 'All Products', link: '/products/all' },
          { label: 'Categories', link: '/products/categories' },
          { label: 'Inventory', link: '/products/inventory' },
        ],
      },
      { label: 'Orders', link: '/orders' },
      { label: 'Customers', link: '/crm' },
    ],
  },
  { label: 'Management', heading: true },
  {
    icon: IconUsers,
    label: 'Users',
    links: [
      { label: 'Active Users', link: '/users/active' },
      { label: 'Banned Users', link: '/users/banned' },
      {
        label: 'Sub-levels',
        links: [
          { label: 'Level 3.1', link: '/l3-1' },
          {
            label: 'Level 3.2',
            links: [
              { label: 'Level 4.1', link: '/l4-1' },
              { label: 'Level 4.2', link: '/l4-2' },
            ],
          },
        ],
      },
    ],
  },
  { icon: IconShieldLock, label: 'Roles', link: '/roles' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
  { icon: IconUserCircle, label: 'Profile', link: '/profile' },
];

export function PremiumSidebar({
  onClose,
  collapsed,
}: {
  onClose: () => void;
  collapsed?: boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const links = useMemo(
    () =>
      mockLinks.map((item, index) => (
        <SidebarItem
          key={`${item.label}-${index}`}
          item={item}
          collapsed={collapsed}
          onNavigate={handleNavigate}
          currentPath={location.pathname}
          level={0}
        />
      )),
    [collapsed, location.pathname]
  );

  return (
    <ScrollArea h="calc(100vh - 120px)" scrollbars="y" type="hover">
      <Box pb="xl" style={{ overflow: 'hidden' }}>
        {links}
      </Box>
    </ScrollArea>
  );
}

function SidebarItem({
  item,
  collapsed,
  onNavigate,
  currentPath,
  level,
}: {
  item: LinkItem;
  collapsed?: boolean;
  onNavigate: (path: string) => void;
  currentPath: string;
  level: number;
}) {
  if (item.heading) {
    if (collapsed) return <Box h={1} bg="gray.2" my="md" mx="xs" opacity={0.5} />;
    return (
      <Text
        size="xs"
        fw={700}
        c="dimmed"
        tt="uppercase"
        mt="lg"
        mb="xs"
        px="md"
        style={{ letterSpacing: '0.5px' }}
      >
        {item.label}
      </Text>
    );
  }

  const hasLinks = Array.isArray(item.links) && item.links.length > 0;
  const isSelected = item.link === currentPath;
  const isChildActive = (links?: LinkItem[]): boolean => {
    if (!links) return false;
    return links.some((l) => l.link === currentPath || isChildActive(l.links));
  };
  const isActiveGroup = isChildActive(item.links);

  if (collapsed && level === 0) {
    return (
      <Box mb={6}>
        <Menu position="right-start" offset={15} withArrow shadow="md" trigger="hover" openDelay={100}>
          <Menu.Target>
            <Tooltip label={item.label} position="right" disabled={hasLinks}>
              <UnstyledButton
                onClick={() => !hasLinks && item.link && onNavigate(item.link)}
                styles={(theme) => ({
                  root: {
                    width: '100%',
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme.radius.md,
                    color: isSelected || isActiveGroup ? theme.colors.primary[6] : theme.colors.gray[7],
                    backgroundColor: isSelected || isActiveGroup ? theme.colors.primary[0] : 'transparent',
                    '&:hover': {
                      backgroundColor: isSelected || isActiveGroup ? theme.colors.primary[1] : theme.colors.gray[0],
                    },
                    transition: 'all 200ms ease',
                  },
                })}
              >
                {item.icon ? <item.icon size={22} stroke={1.5} /> : <IconCircleFilled size={8} />}
              </UnstyledButton>
            </Tooltip>
          </Menu.Target>

          {hasLinks && (
            <Menu.Dropdown p={8} style={{ minWidth: 200 }}>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" px="xs" mb={8}>
                {item.label}
              </Text>
              <Box>
                {item.links?.map((child, idx) => (
                  <SidebarItem
                    key={idx}
                    item={child}
                    collapsed={false}
                    onNavigate={onNavigate}
                    currentPath={currentPath}
                    level={level + 1}
                  />
                ))}
              </Box>
            </Menu.Dropdown>
          )}
        </Menu>
      </Box>
    );
  }

  if (hasLinks) {
    return (
      <LinksGroup
        item={item}
        onNavigate={onNavigate}
        currentPath={currentPath}
        level={level}
        isActiveGroup={isActiveGroup}
      />
    );
  }

  return (
    <NavLink
      active={isSelected}
      label={
        <Text size="sm" fw={isSelected ? 600 : 500}>
          {item.label}
        </Text>
      }
      leftSection={
        item.icon ? (
          <ThemeIcon
            variant={isSelected ? 'filled' : 'light'}
            size={30}
            color={isSelected ? 'primary' : 'gray'}
            radius="md"
          >
            <item.icon size={18} stroke={1.5} />
          </ThemeIcon>
        ) : (
          <Box w={30} h={30} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <IconCircleFilled size={isSelected ? 8 : 6} color={isSelected ? 'var(--mantine-color-primary-6)' : 'var(--mantine-color-gray-4)'} />
          </Box>
        )
      }
      onClick={() => item.link && onNavigate(item.link)}
      mb={4}
      styles={(theme) => ({
        root: {
          borderRadius: theme.radius.md,
          padding: '10px 16px',
          paddingLeft: level > 0 ? 16 + level * 12 : 16,
          backgroundColor: isSelected ? theme.colors.primary[0] : 'transparent',
          color: isSelected ? theme.colors.primary[7] : theme.colors.gray[7],
          '&:hover': {
            backgroundColor: isSelected ? theme.colors.primary[1] : theme.colors.gray[0],
          },
          transition: 'all 200ms ease',
        },
      })}
    />
  );
}

function LinksGroup({
  item,
  onNavigate,
  currentPath,
  level,
  isActiveGroup,
}: {
  item: LinkItem;
  onNavigate: (path: string) => void;
  currentPath: string;
  level: number;
  isActiveGroup: boolean;
}) {
  const [opened, setOpened] = useState(item.initiallyOpened || isActiveGroup || false);
  const Icon = item.icon;

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        w="100%"
        p="xs"
        mb={4}
        styles={(theme) => ({
          root: {
            borderRadius: theme.radius.md,
            padding: '10px 16px',
            paddingLeft: level > 0 ? 16 + level * 12 : 16,
            backgroundColor: isActiveGroup ? theme.colors.primary[0] : 'transparent',
            '&:hover': {
              backgroundColor: isActiveGroup ? theme.colors.primary[1] : theme.colors.gray[0],
            },
            transition: 'all 200ms ease',
          },
        })}
      >
        <Group justify="space-between" gap={0} wrap="nowrap">
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {Icon ? (
              <ThemeIcon
                variant={isActiveGroup ? 'filled' : 'light'}
                size={30}
                color={isActiveGroup ? 'primary' : 'gray'}
                radius="md"
              >
                <Icon size={18} stroke={1.5} />
              </ThemeIcon>
            ) : (
                <Box w={30} h={30} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconCircleFilled size={isActiveGroup ? 8 : 6} color={isActiveGroup ? 'var(--mantine-color-primary-6)' : 'var(--mantine-color-gray-4)'} />
                </Box>
            )}
            <Box ml="md">
              <Text size="sm" fw={500} c={isActiveGroup ? 'primary.7' : 'gray.7'}>
                {item.label}
              </Text>
            </Box>
          </Box>
          <IconChevronRight
            size={14}
            stroke={2}
            color={isActiveGroup ? 'var(--mantine-color-primary-6)' : 'var(--mantine-color-gray-5)'}
            style={{
              transform: opened ? `rotate(90deg)` : 'none',
              transition: 'transform 200ms ease',
            }}
          />
        </Group>
      </UnstyledButton>
      <Collapse in={opened}>
        {item.links?.map((child, idx) => (
          <SidebarItem
            key={idx}
            item={child}
            onNavigate={onNavigate}
            currentPath={currentPath}
            level={level + 1}
          />
        ))}
      </Collapse>
    </>
  );
}
