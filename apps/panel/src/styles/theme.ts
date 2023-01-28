import { extendTheme, Theme } from '@chakra-ui/react';

const theme: Partial<Theme> = extendTheme({
  styles: {
    global: {
      'html, body': {
        width: '100%',
        height: '100%',
      },
      body: {
        fontFamily: "'Inter', sans-serif",
        color: 'blackAlpha.900',
        backgroundColor: 'white',
      },
    },
  },
});

export default theme;
