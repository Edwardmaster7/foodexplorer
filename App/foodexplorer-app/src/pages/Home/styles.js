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

  #header-top-padding {
    background-color: ${({ theme }) => theme.colors.dark_700};
    height: 1.6rem;
    width: 100%;
  }

  .hidden {
    display: none;
  }

  @media ${devices.tablet} {
    #header-top-padding {
      height: 3.6rem;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 2.8rem 2.4rem;
  /* border-bottom: 1px solid #ccc; */

  position: sticky;
  top: 0;
  z-index: 999;

  background-color: ${({ theme }) => theme.colors.dark_700};

  font-family: "Roboto", sans-serif;
  font-size: 2.4rem;

  #menu-img:active {
    transform: scale(0.9);
  }

  #logo {
    height: 2.6rem;
    /* margin-bottom: 1.6rem; */
  }

  #logo-desktop {
    display: none;
  }

  #sign-out {
    display: none;
  }
  #sign-out:active {
    transform: scale(0.9);
  }

  @media ${devices.tablet} {
    padding-right: 10rem;
    padding-left: 10rem;

    gap: 3.2rem;

    justify-content: none;

    #menu {
      display: none;
    }

    #logo {
      display: none;
    }

    #logo-desktop {
      display: flex;
      height: clamp(3rem, 2dw, 5rem);
      /* margin-bottom: 1.6rem; */
    }

    #receipt {
      display: none;
    }
    #sign-out {
      display: flex;
    }
  }

  @media ${devices.desktop} {
    padding-right: 12rem;
    padding-left: 12rem;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  display: none;
  align-items: center;
  flex-direction: column;

  input {
    padding: 1.2rem 1.4rem;
    border-radius: 0.5rem;

    text-align: center;

    font-size: 1.6rem;
    font-weight: 400;
    line-height: 160%;
    background-image: url(${searchIcon});
    background-position: 19%;
    background-repeat: no-repeat;
    background-size: auto 50%; // Adjust as needed
  }

  input:not(:placeholder-shown) {
    background-image: none;
  }

  @media ${devices.tablet} {
    display: flex;
  }

  @media ${devices.desktop} {
    input {
      background-position: 25%;
    }
  }

`;

export const ResultsWrapper = styled.div`
  position: absolute;
  top: 100%; // This positions it right below the search input
  left: 0;
  width: 100%; // This makes it the same width as the search input
  max-height: 60vh;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.dark_400};  

  width: 100%;

  z-index: 998;

  border-radius: 1rem;

  outline: 0.3rem solid ${({ theme }) => theme.colors.deep_green};

  border-top-left-radius: 0;
  border-top-right-radius: 0;

  border-top: transparent;

  /* &:hover {
    border: 0.3rem solid ${({ theme }) => theme.colors.deep_green};
  } */

  .result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;

    padding: 1.2rem;

    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.dark_600};

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    background-color: ${({ theme }) => theme.colors.dark_400};

    &:last-child {
      border-bottom: none;
    }
  }

  .result h2 {
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: 500;
  }

  .result p {
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    line-height: 140%;
    font-weight: 400;

    color: ${({ theme }) => theme.colors.light_400};
  }

  .result a {
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.tunrs_green};
  }

  .result a:active {
    transform: scale(0.9);
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

export const OrderButton = styled.button`
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;

  width: 17.2rem;
  height: 4.8rem;

  padding: 1.2rem 3.2rem;

  border: none;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.colors.tomato_100};
  color: ${({ theme }) => theme.colors.light_100};

  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  font-weight: 500;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
    animation: none;
  }

  @media ${devices.tablet} {
    display: flex;
  }
`;
