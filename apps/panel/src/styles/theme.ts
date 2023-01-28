import { defineStyleConfig, extendTheme, Theme } from '@chakra-ui/react';

const theme: Partial<Theme> = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
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
  components: {
    Button: defineStyleConfig({
      defaultProps: {
        colorScheme: 'orange',
      },
    }),
  },
});

export default theme;
