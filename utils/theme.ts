import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    components: {
        Popover: {
            sizes: {
                xl: {
                  h: '56px',
                  w: '20px',
                  fontSize: 'lg',
                  px: '32px',
                },
              },
        }
    }
});