import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Anchor,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
    notifications.show({
      title: 'Email Sent',
      message: 'If an account exists, a password reset link has been sent.',
      color: 'blue',
    });
    navigate('/login');
  });

  return (
    <Container size={460} my={30}>
      <Title ta="center">Forgot your password?</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Your email"
            placeholder="me@nexgen.com"
            required
            {...form.getInputProps('email')}
          />
          <Group justify="space-between" mt="lg" className="controls">
            <Anchor c="dimmed" size="sm" component="button" onClick={() => navigate('/login')}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <span style={{ marginLeft: 5 }}>Back to the login page</span>
              </Center>
            </Anchor>
            <Button type="submit" color="primary">Reset password</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
