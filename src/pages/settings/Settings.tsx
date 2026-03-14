import { Box, Card, Title, Text, Switch, Group, TextInput, Select, NumberInput, Button, Stack, MultiSelect, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { PageHeader } from '../../components/common/PageHeader';
import { IconUpload } from '@tabler/icons-react';

export function Settings() {
  const form = useForm({
    initialValues: {
      siteName: 'NexGen Admin',
      supportEmail: 'support@nexgen.com',
      language: 'en',
      timezone: 'UTC',
      maxLoginAttempts: 5,
      enable2FA: true,
      emailNotifications: true,
      smsNotifications: false,
      allowedDomains: ['nexgen.com', 'admin.nexgen.com'],
      logo: null,
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
    notifications.show({
      title: 'Settings Saved',
      message: 'System settings have been successfully updated.',
      color: 'green',
    });
  });

  return (
    <Box>
      <PageHeader
        title="System Settings"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Settings', href: '/settings' },
        ]}
      />

      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          <Card padding="xl" radius="md" withBorder>
            <Title order={3} mb="md">General Information</Title>
            <Text c="dimmed" size="sm" mb="xl">
              Basic settings for your application platform.
            </Text>

            <Group grow mb="md">
              <TextInput
                label="Site Name"
                placeholder="Enter site name"
                required
                {...form.getInputProps('siteName')}
              />
              <TextInput
                label="Support Email"
                placeholder="support@example.com"
                required
                {...form.getInputProps('supportEmail')}
              />
            </Group>

            <Group grow mb="md">
              <Select
                label="Language"
                data={[
                  { value: 'en', label: 'English' },
                  { value: 'fr', label: 'French' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'de', label: 'German' },
                ]}
                {...form.getInputProps('language')}
              />
              <Select
                label="Timezone"
                data={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'PST', label: 'Pacific Standard Time' },
                  { value: 'EST', label: 'Eastern Standard Time' },
                ]}
                {...form.getInputProps('timezone')}
              />
            </Group>

            <FileInput
              label="Company Logo"
              placeholder="Upload image"
              leftSection={<IconUpload size={14} />}
              accept="image/png,image/jpeg"
              {...form.getInputProps('logo')}
            />
          </Card>

          <Card padding="xl" radius="md" withBorder>
            <Title order={3} mb="md">Security & Access</Title>
            <Text c="dimmed" size="sm" mb="xl">
              Configure authentication and security parameters.
            </Text>

            <NumberInput
              label="Maximum Login Attempts"
              description="Number of failed logins before account lockout"
              min={1}
              max={10}
              mb="md"
              w={300}
              {...form.getInputProps('maxLoginAttempts')}
            />

            <MultiSelect
              label="Allowed Domains"
              description="Users can only register with emails from these domains"
              data={['nexgen.com', 'admin.nexgen.com', 'partner.com']}
              searchable
                            mb="xl"
              {...form.getInputProps('allowedDomains')}
            />

            <Switch
              label="Require Two-Factor Authentication"
              description="Force all admin users to use 2FA"
              mb="md"
              {...form.getInputProps('enable2FA', { type: 'checkbox' })}
            />
          </Card>

          <Card padding="xl" radius="md" withBorder>
            <Title order={3} mb="md">Notifications</Title>
            <Text c="dimmed" size="sm" mb="xl">
              Manage system-wide notification preferences.
            </Text>

            <Switch
              label="Email Notifications"
              description="Send daily summary emails to administrators"
              mb="md"
              {...form.getInputProps('emailNotifications', { type: 'checkbox' })}
            />

            <Switch
              label="SMS Alerts"
              description="Send SMS alerts for critical system events"
              mb="md"
              {...form.getInputProps('smsNotifications', { type: 'checkbox' })}
            />
          </Card>

          <Group justify="flex-end" mt="md">
            <Button variant="default">Cancel</Button>
            <Button type="submit" color="primary">Save Configuration</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
