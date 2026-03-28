import { Container, Title, TextInput, PasswordInput, Button, Text, Anchor, Group, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../../components/common/GlassCard';

export function Login() {
  const navigate = useNavigate();

  return (
    <Box style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Container size={420} w="100%">
        <GlassCard p={40} radius="xl">
          <Title ta="center" fw={900} mb="xs">
            Welcome back!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb={30}>
            Do not have an account yet?{' '}
            <Anchor size="sm" component="button" onClick={() => navigate('/register')} fw={600}>
              Create account
            </Anchor>
          </Text>

          <TextInput
            label="Email"
            placeholder="you@nexgen.com"
            required
            className="glass-morphism-input"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            className="glass-morphism-input"
          />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm" onClick={() => navigate('/forgot-password')}>
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={() => navigate('/')} className="glass-morphism-button">
            Sign in
          </Button>
        </GlassCard>
      </Container>
    </Box>
  );
}
