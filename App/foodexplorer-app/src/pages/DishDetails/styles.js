import styled from "styled-components";
import { devices } from "../../styles/theme";

export const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: max-content;

  padding: 1.6rem 5.6rem;
  padding-bottom: 3rem;

  /* border: 1px solid red; */

  #button-link {
    margin-top: 2rem;

    /* border: 1px solid red; */

    width: 100%;
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
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* background-color: aliceblue; */

  padding: 1.6rem 2.6rem;
`;

export const DishImage = styled.img`
  width: 24rem;
  height: 24rem;
  object-fit: cover;
  border-radius: 50%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  margin-top: 1.6rem;

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

    margin-bottom: 2rem;

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: .8rem 2.8rem;
      gap: 0.8rem;

      width: 100%;

      /* background: none; */
      /* border: none; */

      font-size: 1rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.tanger_100};

      cursor: pointer;
    }
    button img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  @media ${devices.tablet} {
    align-items: flex-start;
    justify-content: flex-start;
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
