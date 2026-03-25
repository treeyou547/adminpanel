import { Paper } from '@mantine/core';
import type { PaperProps } from '@mantine/core';
import type { ReactNode } from 'react';

interface GlassCardProps extends PaperProps {
  children: ReactNode;
  className?: string;
  withBorder?: boolean;
}

/**
 * Reusable GlassCard component that encapsulates the glassmorphism CSS.
 * This adheres to the Single Responsibility Principle by isolating the styling logic.
 */
export function GlassCard({ children, className = '', withBorder = true, ...props }: GlassCardProps) {
  return (
    <Paper
      className={`glass-morphism ${className}`}
      radius="md"
      {...props}
      style={{
        border: withBorder ? '1px solid var(--glass-border)' : 'none',
        ...props.style,
      }}
    >
      {children}
    </Paper>
  );
}
