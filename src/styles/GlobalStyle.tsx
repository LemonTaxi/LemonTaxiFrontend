import { reset } from '@/styles/reset';
import { css, Global } from '@emotion/react';

export default function GlobalStyle() {
  return (
    <Global
      styles={css`
        ${reset}
        body, button, input, textarea {
          font-family:
            Pretendard,
            -apple-system,
            BlinkMacSystemFont,
            system-ui,
            Roboto,
            'Helvetica Neue',
            'Segoe UI',
            'Apple SD Gothic Neo',
            'Noto Sans KR',
            'Malgun Gothic',
            sans-serif !important;
        }
      `}
    />
  );
}
