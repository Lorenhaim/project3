import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #111;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    width: 100%;
    max-width: 1200px;
    background: #333;
    padding: 2rem;
    position: relative;
    border-radius: .25rem;
    outline: none;
  }

  .react-modal-close {
    position: absolute;
    right: .5rem;
    top: .5rem;
    border: 0;
    background: transparent;
    color: white;
    font-size: 1rem;
  }
`