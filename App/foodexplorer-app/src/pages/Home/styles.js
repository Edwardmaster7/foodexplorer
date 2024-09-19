import styled from "styled-components";

export const App = styled.div`
  /* background-color: #F5F5F5; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: max-content;
  width: 100vw;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;
  padding: 5.6rem 2.8rem 2.4rem;
  /* border-bottom: 1px solid #ccc; */

  background-color: ${({ theme }) => theme.colors.dark_700};

  font-family: "Roboto", sans-serif;
  font-size: 2.4rem;


  #logo {
    gap: 0.6rem;

    h1 {
      font-size: 2rem;
      font-weight: 700;
    }
    img {
      width: 2.4rem;
      height: 2.4rem;
    }
    /* margin-bottom: 1.6rem; */
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
  padding: 3.2rem 2.4rem;
  padding-right: 0;

  gap: 3.2rem;

  .option {
    display: flex;

    padding: 0.1rem;

    font-family: "Poppins", "sans";
    font-size: 2.4rem;
    font-weight: lighter;
    line-height: 140%;
  }
`;

export const Banner = styled.div`
  /* background-color: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.dark_900},
      ${({ theme }) => theme.colors.dark_700}
    ); */

  margin-top: 1.5rem;
  margin-left: 0.6rem;

  width: 100%;
  height: fit-content;
  /* background-color: ${({ theme }) => theme.colors.dark_700}; */

  #wrapper {
    position: absolute;

    img {
      position: relative;
      height: 14.2rem;

    }
  }

  #rectangle {
    display: grid;
    grid-template-columns: 0.7fr 1fr;

    margin-top: 2.9rem;
    margin-left: 3rem;
    margin-right: 1.2rem;
    background: linear-gradient(to bottom, #091e26, #00131c);

    min-height: 12rem;

    #banner-text {
      padding: 3.2rem 0.6rem;

      color: ${({ theme }) => theme.colors.light_300};
      font-family: "Poppins", sans-serif;
      
      h1 {
        font-size: 1.6rem;
        font-weight: bolder;
      }
      p {
        font-size: 1.1rem;
        font-weight: normal;
        line-height: 140%;

      }
    }
  }
`;
