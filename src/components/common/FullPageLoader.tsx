import { Box, Stack, Text, Transition, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export function FullPageLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const theme = useMantineTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Wait for exit transition to finish before calling onComplete
      setTimeout(onComplete, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Transition mounted={visible} transition="fade" duration={600} timingFunction="ease">
      {(styles) => (
        <Box
          style={{
            ...styles,
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'var(--mantine-color-body)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack align="center" gap="xl">
            <div className="logo-animation-container">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.colors.primary[7]}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path className="logo-path" d="M12 2L2 7l10 5 10-5-10-5z" />
                <path className="logo-path delay-1" d="M2 17l10 5 10-5" />
                <path className="logo-path delay-2" d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: 'primary.7', to: 'primary.4', deg: 45 }}
                style={{
                  fontSize: '2rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  animation: 'pulse 2s infinite',
                }}
              >
                NexGen Admin
              </Text>
              <Text size="sm" c="dimmed" mt={5} fw={500} style={{ letterSpacing: '3px' }}>
                PROFESSIONAL DASHBOARD
              </Text>
            </Box>
          </Stack>

          <style>{`
            @keyframes draw {
              0% {
                stroke-dasharray: 0 100;
                opacity: 0;
              }
              50% {
                stroke-dasharray: 100 0;
                opacity: 1;
              }
              100% {
                stroke-dasharray: 100 0;
                opacity: 1;
              }
            }

            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(1); opacity: 0.8; }
            }

            .logo-path {
              stroke-dasharray: 100;
              stroke-dashoffset: 100;
              animation: draw-path 2s ease-in-out infinite;
            }

            .delay-1 { animation-delay: 0.2s; }
            .delay-2 { animation-delay: 0.4s; }

            @keyframes draw-path {
              0% { stroke-dashoffset: 100; opacity: 0; }
              20% { opacity: 1; }
              50% { stroke-dashoffset: 0; }
              80% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0; }
            }

            .logo-animation-container {
              animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
          `}</style>
        </Box>
      )}
    </Transition>
  );
}
