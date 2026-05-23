import { Title, Text, Button, Container, Group as MantineGroup, AppShell, Flex, Box, Stack, Grid } from '@mantine/core';
import { motion } from 'framer-motion';

export function Home() {
  return (
    <AppShell header={{ height: 80 }} padding={0}>
      <AppShell.Header style={{ backgroundColor: '#111', borderBottom: '1px solid #333' }}>
        <Container size="xl" h="100%">
          <MantineGroup justify="space-between" h="100%" align="center">
            <Title order={2} c="white" style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '2px' }}>CRAV</Title>
            <MantineGroup gap="lg">
              <Text c="white" fw={600} style={{ cursor: 'pointer' }}>Home</Text>
              <Text c="dimmed" fw={600} style={{ cursor: 'pointer' }}>Menu</Text>
              <Text c="dimmed" fw={600} style={{ cursor: 'pointer' }}>Locations</Text>
            </MantineGroup>
            <Button color="orange" radius="xl" size="md">Order Now</Button>
          </MantineGroup>
        </Container>
      </AppShell.Header>

      <AppShell.Main style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh' }}>

        {/* HERO SECTION */}
        <Box pt={120} pb={80} style={{ position: 'relative', overflow: 'hidden' }}>
          <Container size="xl">
            <Stack align="center" gap="xl" style={{ textAlign: 'center' }}>
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                <Title
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 12rem)',
                    lineHeight: 0.9,
                    fontFamily: 'Impact, sans-serif',
                    textTransform: 'uppercase',
                    color: '#fff',
                    marginBottom: '1rem'
                  }}
                >
                  SMASHED<br /><span style={{ color: '#ff6b00' }}>FRESH</span>
                </Title>
              </motion.div>

              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <Text size="xl" c="dimmed" maw={600} mx="auto">
                  Smashed hot on the flat top, our prime patties lock in ultimate juiciness under a caramelized crust. Crafted to satisfy your cravings.
                </Text>
              </motion.div>

              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <Button size="xl" color="orange" radius="xl" mt="xl">See Menu</Button>
              </motion.div>
            </Stack>
          </Container>
        </Box>

        {/* EXPERIENCE SECTION */}
        <Box py={100} style={{ backgroundColor: '#1a1a1a' }}>
          <Container size="xl">
            <Grid gutter={80} align="center">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <Box style={{ width: '100%', height: '400px', backgroundColor: '#333', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Text c="dimmed">Burger Image Placeholder</Text>
                    </div>
                  </Box>
                </motion.div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                  <Text c="orange" fw={700} style={{ letterSpacing: '2px', textTransform: 'uppercase' }} mb="sm">The Experience</Text>
                  <Title order={2} size="h1" mb="xl" style={{ fontFamily: 'Impact, sans-serif' }}>FOOD THAT FEELS GOOD</Title>
                  <Text size="lg" c="dimmed" mb="xl">
                    CRAV is back and bolder than ever. Honoring our rich roots, we bring you the ultimate smashed experience fully loaded, hot, and crafted fresh.
                  </Text>
                  <Flex gap="xl" mb="xl">
                    <Box>
                      <Title order={3} c="white">450</Title>
                      <Text c="dimmed" size="sm">kcal</Text>
                    </Box>
                    <Box>
                      <Title order={3} c="white">100%</Title>
                      <Text c="dimmed" size="sm">Organic</Text>
                    </Box>
                    <Box>
                      <Title order={3} c="white">Zero</Title>
                      <Text c="dimmed" size="sm">Guilt</Text>
                    </Box>
                  </Flex>
                </motion.div>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>

        {/* INGREDIENTS SECTION */}
        <Box py={120}>
          <Container size="xl">
            <Stack align="center" mb={80}>
              <Text c="orange" fw={700} style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>Bold Flavour</Text>
              <Title order={2} style={{ fontSize: '3rem', fontFamily: 'Impact, sans-serif', textAlign: 'center' }}>EVERY LAYER MATTERS</Title>
            </Stack>

            <Grid gutter="xl">
              {[
                { title: 'Fresh Tomato', desc: 'Sun-ripened tomatoes that bring natural sweetness.' },
                { title: 'Premium Cheese', desc: 'Rich, creamy cheese that melts into every bite.' },
                { title: 'Smashed Patty', desc: 'Grilled to perfection juicy, smoky, unforgettable.' },
                { title: 'Toasted Bun', desc: 'Soft, toasted buns crafted to hold everything together.' }
              ].map((item, i) => (
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={i}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Box style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '16px', height: '100%' }}>
                      <Box style={{ width: '60px', height: '60px', backgroundColor: '#ff6b00', borderRadius: '50%', marginBottom: '1.5rem' }} />
                      <Title order={4} mb="sm">{item.title}</Title>
                      <Text c="dimmed">{item.desc}</Text>
                    </Box>
                  </motion.div>
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* FOOTER */}
        <Box py={40} style={{ borderTop: '1px solid #333' }}>
          <Container size="xl">
            <MantineGroup justify="space-between" align="center">
              <Title order={3} style={{ fontFamily: 'Impact, sans-serif' }}>CRAV</Title>
              <Text c="dimmed" size="sm">© 2026 CRAV — All rights reserved</Text>
            </MantineGroup>
          </Container>
        </Box>

      </AppShell.Main>
    </AppShell>
  );
}
