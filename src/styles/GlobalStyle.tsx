import { reset } from '@/styles/reset';
import { css, Global } from '@emotion/react';

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${reset}
      `}
    />
  );
}
