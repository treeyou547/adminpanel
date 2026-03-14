import { createTheme } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';

// You can generate your own palette at https://mantine.dev/colors-generator/
const primaryColors: MantineColorsTuple = [
  '#ebf5ff',
  '#d5e7fb',
  '#a8cdf6',
  '#79b3f2',
  '#539def',
  '#3c8fed',
  '#2f87ec',
  '#2274d3',
  '#1967bd',
  '#0959a7'
];

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: primaryColors,
  },
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        fw: 500,
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
      styles: () => ({
        root: {
          backgroundColor: 'var(--mantine-color-body)',
        },
      }),
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});
