import styled from "styled-components";


export const App = styled.div`
  /* background-color: #F5F5F5; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Header = styled.header`
  display: flex;
  align-items: left;
  gap: 1.6rem;
  justify-content: baseline;
  width: 100%;
  padding: 5.6rem 2.4rem 1.2rem;
  /* border-bottom: 1px solid #ccc; */

  background-color: ${({ theme }) => theme.colors.dark_700};

  font-family: 'Roboto', sans-serif;
  font-size: 2.4rem;

  img {
    margin-bottom: 0.4rem;
  }

  #close:active {
    transform: scale(0.9);
  }

`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: baseline;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 3.2rem 2.4rem 1.6rem;
  
  gap: 3.2rem;

  input {
    width: 100dw;
    /* max-width: 600px; */

    padding: 1.6rem 1.4rem;

    background-color: ${({ theme }) => theme.colors.dark_900};
  }
  
  .option {
    display: flex;

    padding: 0.1rem;

    font-family: 'Poppins', 'sans';
    font-size: 2.4rem;
    font-weight: lighter;
    line-height: 140%;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 3.2rem 2.4rem;
  gap: 0.8rem;

  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;

  background-color: ${({ theme }) => theme.colors.dark_600};

`;
