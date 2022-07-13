import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../utils/theme'
import Head from 'next/head'
import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

// redux
import { store } from '../store';
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from 'react-query';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import url from '../utils/url'

export const queryClient = new QueryClient();

function FacebookPixel() {
  const router = useRouter() 

  useEffect(() => {
    // import("react-facebook-pixel")
    //   .then((x) => x.default)
    //   .then((ReactPixel) => {
    //     ReactPixel.init('748044199533092');
    //     ReactPixel.pageView();

    //     router.events.on("routeChangeComplete", () => {
    //       ReactPixel.pageView();
    //     });
    //   });
  });
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
console.log(url);
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1 "  />
          {/* <meta http-equiv="X-UA-Compatible" content="ie=edge" ></meta> */}
          </Head>

            <FacebookPixel />
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-DB3RZYE00Y`} />

              <Script id="google" strategy="lazyOnload">
                  {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-DB3RZYE00Y', {
                      page_path: window.location.pathname,
                      });
                  `}
              </Script>

          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
