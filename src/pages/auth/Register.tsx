import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

export function Register() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
    },

    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(value)
          ? null
          : 'Password must be at least 6 characters and include uppercase, lowercase, numbers and special characters',
      terms: (value) => (value ? null : 'You must accept terms and conditions'),
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
    notifications.show({
      title: 'Registration Successful',
      message: 'Your account has been created.',
      color: 'green',
    });
    navigate('/');
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Create an account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => navigate('/login')}>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            placeholder="John Doe"
            required
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="you@nexgen.com"
            required
            mt="md"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Checkbox
            label="I accept terms and conditions"
            mt="xl"
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />
          <Button fullWidth mt="xl" type="submit" color="primary">
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
