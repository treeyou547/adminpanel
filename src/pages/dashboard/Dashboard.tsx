import { Grid, Paper, Title, Text, Group, SimpleGrid, ThemeIcon, Progress } from '@mantine/core';
import { AreaChart } from '@mantine/charts';
import { IconArrowUpRight, IconCoin, IconUserPlus, IconShoppingCart, IconArrowDownRight } from '@tabler/icons-react';

const statData = [
  { title: 'Revenue', icon: IconCoin, value: '$13,456', diff: 34, color: 'teal' },
  { title: 'New Users', icon: IconUserPlus, value: '4,145', diff: -13, color: 'red' },
  { title: 'New Orders', icon: IconShoppingCart, value: '1,204', diff: 20, color: 'blue' },
];

const chartData = [
  { date: 'Mar 22', revenue: 2890 },
  { date: 'Mar 23', revenue: 2756 },
  { date: 'Mar 24', revenue: 3322 },
  { date: 'Mar 25', revenue: 3470 },
  { date: 'Mar 26', revenue: 3129 },
  { date: 'Mar 27', revenue: 3900 },
];

export function Dashboard() {
  const stats = statData.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            {stat.title}
          </Text>
          <ThemeIcon color={stat.color} variant="light" size={38} radius="md">
            <stat.icon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text size="xl" fw={700}>
            {stat.value}
          </Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} style={{ display: 'flex', alignItems: 'center' }}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <div>
      <Title order={2} mb="xl">Dashboard Overview</Title>

      <SimpleGrid cols={{ base: 1, sm: 3 }} mb="xl">
        {stats}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper withBorder p="md" radius="md">
            <Title order={4} mb="lg">Revenue Growth</Title>
            <AreaChart
              h={300}
              data={chartData}
              dataKey="date"
              series={[{ name: 'revenue', color: 'indigo.6' }]}
              curveType="natural"
              withGradient
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder p="md" radius="md" h="100%">
            <Title order={4} mb="lg">Monthly Goals</Title>
            <Text fz="sm" fw={500} mb="xs">Acquisition</Text>
            <Progress value={65} color="blue" size="xl" radius="xl" mb="md" />
            <Text fz="sm" fw={500} mb="xs">Retention</Text>
            <Progress value={85} color="teal" size="xl" radius="xl" mb="md" />
            <Text fz="sm" fw={500} mb="xs">Revenue Target</Text>
            <Progress value={45} color="grape" size="xl" radius="xl" />
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}