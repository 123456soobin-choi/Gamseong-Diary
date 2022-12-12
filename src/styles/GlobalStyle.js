import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        color: inherit;
        font-family: 'Pretendard', sans-serif;
    }
    `;

export default GlobalStyle;
