import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    font-size: 62.5%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.dark_400};
    color: ${({ theme }) => theme.colors.light_100};

    /* instruções para deixar as fontes mais bonitas */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, button, a, p {
    font-family: 'Poppins', sans-serif;
  }

  label, input, textarea {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  button, a {
    cursor: pointer;
    transition: filter 0.2s;
  }

  button:hover, a:hover {

    filter: brightness(0.9);
  }

  .Toastify__toast-container {
    z-index: 9999;
  }

  .Toastify__toast--success {
    background: #2e7d32;
  }

  .Toastify__toast--error {
    background: #c62828;
  }

  .Toastify__toast--warning {
    background: #ff6f00;
  }

  .Toastify__toast--info {
    background: #0288d1;
  }

  .Toastify__toast {
    border-radius: 5px;
  }

  .Toastify__toast-body {
    color: #fff;
    font-size: 1.5rem;
  }

  .Toastify__progress-bar {
    background: #fff;
  }
`;

export default GlobalStyles;