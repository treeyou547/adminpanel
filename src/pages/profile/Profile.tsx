import { Box, Card, Text, Avatar, Group, Grid, TextInput, Textarea, Button, Divider, Title } from '@mantine/core';
import { PageHeader } from '../../components/common/PageHeader';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

export function Profile() {
  const form = useForm({
    initialValues: {
      name: 'Admin User',
      email: 'admin@nexgen.com',
      phone: '+1 (555) 000-0000',
      location: 'San Francisco, CA',
      bio: 'Senior system administrator with 10 years of experience managing enterprise platforms.',
    },
  });

  const handleSubmit = form.onSubmit(() => {
    notifications.show({
      title: 'Profile Updated',
      message: 'Your profile information has been saved successfully.',
      color: 'green',
    });
  });

  return (
    <Box>
      <PageHeader
        title="User Profile"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Profile', href: '/profile' },
        ]}
      />

      <Grid>
        <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
          <Card padding="xl" radius="md" ta="center">
            <Avatar src="https://i.pravatar.cc/150?u=ad" size={120} radius={120} mx="auto" />
            <Text ta="center" fz="lg" fw={500} mt="md">
              {form.values.name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {form.values.email}
            </Text>

            <Button variant="default" fullWidth mt="md">
              Change avatar
            </Button>

            <Divider my="xl" />

            <Group gap={10} mb="sm">
              <IconMail size={16} stroke={1.5} />
              <Text size="sm">{form.values.email}</Text>
            </Group>
            <Group gap={10} mb="sm">
              <IconPhone size={16} stroke={1.5} />
              <Text size="sm">{form.values.phone}</Text>
            </Group>
            <Group gap={10}>
              <IconMapPin size={16} stroke={1.5} />
              <Text size="sm">{form.values.location}</Text>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
          <Card padding="xl" radius="md">
            <Title order={3} mb="xl">Personal Information</Title>
            <form onSubmit={handleSubmit}>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Full Name"
                    placeholder="Your name"
                    {...form.getInputProps('name')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Phone"
                    placeholder="Your phone number"
                    {...form.getInputProps('phone')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    label="Location"
                    placeholder="City, Country"
                    {...form.getInputProps('location')}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Textarea
                    label="Bio"
                    placeholder="Tell us about yourself"
                    autosize
                    minRows={4}
                    {...form.getInputProps('bio')}
                  />
                </Grid.Col>
              </Grid>
              <Group justify="flex-end" mt="xl">
                <Button type="submit">Save Changes</Button>
              </Group>
            </form>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
