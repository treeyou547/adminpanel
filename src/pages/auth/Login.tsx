import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Anchor, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@nexgen.com" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group justify="space-between" mt="lg">
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={() => navigate('/dashboard')}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
