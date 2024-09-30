import styled from "styled-components";
import { devices } from "../../styles/theme";
import searchIcon from "../../assets/icons/search.svg";

export const App = styled.div`
  /* background-color: #F5F5F5; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: max-content;
  width: 100vw;

  .hidden {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: baseline;
  width: 100%;
  /* max-width: 1200px; */
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

  @media ${devices.tablet} {
    padding-right: 10rem;
    padding-left: 10rem;
  }

  @media ${devices.desktop} {
    padding-right: 12rem;
    padding-left: 12rem;
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

      top: 0.6rem;
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

    border-radius: 1.4rem;

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

  @media ${devices.tablet} {
    margin-top: 12rem;

    #wrapper {
      img {
        height: 42rem;
        left: 6rem;
      }

      top: 15rem;
      overflow: hidden;

      height: 39rem;
      width: 60rem;
    }
    #rectangle {
      margin-top: 3.2rem;
      margin-left: 10rem;
      margin-right: 10rem;
      min-height: 26rem;

      grid-template-columns: 1fr 1fr;

      /* padding: 8.8rem 10rem 1.2rem; */
      padding-top: 6rem;

      #banner-text {
        h1 {
          font-size: 4rem;
          font-weight: 500;
          line-height: 140%;
        }
        p {
          font-size: 1.4rem;
          line-height: 100%;
          font-weight: normal;

          br {
            display: none;
          }
        }
      }
    }
  }

  @media ${devices.desktop} {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

