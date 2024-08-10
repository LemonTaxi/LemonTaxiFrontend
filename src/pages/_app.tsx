import GlobalStyle from '@/styles/GlobalStyle';
import themeConfig from '@/styles/themeConfig';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ConfigProvider theme={themeConfig}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
