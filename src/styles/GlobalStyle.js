import { createGlobalStyle } from 'styled-components';
import '../fonts/font.css';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: "NanumBarunpen";
    }

    body {
        color: inherit;
    }
    `;

export default GlobalStyle;
