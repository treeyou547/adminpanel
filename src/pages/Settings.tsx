import { TextInput, Switch, Group, Stack, Paper, Button, Title, Text, Divider, Select } from '@mantine/core';

export function Settings() {
  return (
    <Stack gap="lg" maw={800} mx="auto" w="100%">
      <Title order={2}>Account Settings</Title>

      <Paper withBorder p="md" radius="md">
        <Stack gap="md">
          <Text fw={500}>Profile Information</Text>
          <Group grow align="flex-start">
            <TextInput label="First Name" placeholder="Your first name" defaultValue="Admin" />
            <TextInput label="Last Name" placeholder="Your last name" defaultValue="User" />
          </Group>
          <TextInput label="Email" placeholder="your@email.com" defaultValue="admin@example.com" />

          <Divider my="sm" />

          <Text fw={500}>Preferences</Text>
          <Select
            label="Language"
            placeholder="Select language"
            defaultValue="en"
            data={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' },
            ]}
          />
          <Switch
            label="Email Notifications"
            description="Receive email alerts for important activity"
            defaultChecked
          />
          <Switch
            label="Two-Factor Authentication"
            description="Enable 2FA for enhanced security"
          />

          <Divider my="sm" />

          <Group justify="flex-end">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
