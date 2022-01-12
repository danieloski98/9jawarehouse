import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../utils/theme'

// redux
import { store } from '../store';
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
