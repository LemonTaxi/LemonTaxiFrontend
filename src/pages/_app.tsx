import GlobalStyle from '@/styles/GlobalStyle';
import themeConfig from '@/styles/themeConfig';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@/styles/custom-antd-dropdown.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"
          crossOrigin="anonymous"
        />
      </Head>
      <GlobalStyle />
      <ConfigProvider theme={themeConfig}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
