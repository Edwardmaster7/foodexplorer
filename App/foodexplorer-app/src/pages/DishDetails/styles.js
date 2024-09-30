import styled from "styled-components";
import { devices } from "../../styles/theme";

export const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 80vh;

  margin: 1.6rem 5.6rem;
  margin-bottom: 3rem;

  /* border: 1px solid red; */

  #button-link {
    margin-top: 2rem;

    /* border: 1px solid   red; */

    width: 100%;
  }
  @media ${devices.desktop} {
    margin: 2.4rem 12.4rem;

    align-items: flex-start;
    justify-content: left;

    max-height: 40vh;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.light_100};
  /* margin-bottom: 2.4rem; */
  cursor: pointer;

  display: inline-flex;
  align-items: center;

  @media ${devices.tablet} {
    margin-left: 0;

    /* border: 1px solid red; */
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  margin-top: 1.6rem;

  @media ${devices.tablet} {
    /* border: 1px solid green; */

    flex-direction: row;
    align-items: center;
    justify-content: left;

    gap: 2.4rem;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* background-color: aliceblue; */

  padding: 1.6rem 2.6rem;

  @media ${devices.desktop} {
    padding: 0;
    margin-right: 4.7rem;
    /* border: 1px solid white; */
  }
`;

export const DishImage = styled.img`
  width: clamp(24rem, 8vw, 40rem);
  height: auto;
  object-fit: cover;
  border-radius: 50%;

  @media ${devices.tablet} {
    width: 40rem;
    height: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  h1 {
    font-size: 3.2rem;
    font-weight: 500;
    text-align: center;

    color: ${({ theme }) => theme.colors.light_300};
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    text-align: center;

    color: ${({ theme }) => theme.colors.light_300};
  }

  #include {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 1.6rem;

    width: 100%;

    padding-top: 2.4rem;
    margin-bottom: 2rem;

    a {
      width: 100%;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 2rem;
      gap: 0.8rem;

      width: 100%;

      /* background: none; */
      /* border: none; */

      font-size: 1.2rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.tanger_100};

      cursor: pointer;
    }

    button img {
      width: 2.4rem;
      height: auto;
    }




    .font-button-admin-mobile {
      font-size: 1.6rem;
    }

    @media ${devices.tablet} {
      /* justify-content: flex-start;   */

      /* border: 1px solid red; */

      width: auto;

      gap: 3rem;

      p {
        font-size: 2.4rem;
      }

      button {
        /* display: flex; */
        padding-right: 4rem;
        padding-left: 4rem;
        font-size: 1.6rem;
        /* width: 100%; */
      }

      button img {
        display: none;
      }
    }
  }

  @media ${devices.tablet} {
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;

    gap: 2.4rem;
  }
`;

export const IngredientsWrapper = styled.ul`
  /* display: grid; */
  /* grid-template-columns: repeat(3, auto); */
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  justify-content: center;
  justify-items: center;

  padding-right: 2rem;
  padding-left: 2rem;

  width: 100%;

  li {
    width: fit-content;

    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_300};

    padding: 0.4rem 0.8rem;

    border-radius: 0.8rem;

    background-color: ${({ theme }) => theme.colors.dark_1000};

    list-style: none;
  }

  @media ${devices.tablet} {
    padding-left: 0;
  }
  /* 
  li:nth-child(3n-1) {
    justify-self: center;
    background-color: red;
  }

  li:nth-child(3n+3) {
    justify-self: start;
  }

  li:nth-child(3n-2) {
    justify-self: end;
    background-color: white;
  } */
`;
