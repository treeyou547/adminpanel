import { Group, Title, Breadcrumbs, Anchor, Button } from '@mantine/core';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  withAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({ title, breadcrumbs, withAction, actionLabel, onAction }: PageHeaderProps) {
  const items = breadcrumbs.map((item, index) => (
    <Anchor component={Link} to={item.href} key={index} c="dimmed" size="sm">
      {item.title}
    </Anchor>
  ));

  return (
    <Group justify="space-between" mb="xl">
      <div>
        <Title order={2} mb={4}>{title}</Title>
        <Breadcrumbs separator={<IconChevronRight size={14} />} mt="xs">
          {items}
        </Breadcrumbs>
      </div>

      {withAction && actionLabel && (
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Group>
  );
}
