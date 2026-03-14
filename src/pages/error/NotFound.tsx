import { Title, Text, Container, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Container size="sm" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <Title
        style={{
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: 16,
          color: 'var(--mantine-color-gray-3)'
        }}
      >
        404
      </Title>
      <Title order={2} ta="center" mb="md">
        You have found a secret place.
      </Title>
      <Text c="dimmed" size="lg" ta="center" mb="xl">
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button size="lg" variant="default" leftSection={<IconArrowLeft size={20} />} onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button size="lg" color="primary" onClick={() => navigate('/')}>
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
