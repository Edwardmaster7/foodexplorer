import styled from "styled-components";
import { devices } from "../../styles/theme";

export const Card = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* gap: 1.2rem; */
  justify-content: space-between;

  min-width: 21rem;
  /* height: 100%; */

  /* min-height: max-content; */

  p {
    font-family: "Roboto", sans-serif;
  }

  background-color: ${({ theme }) => theme.colors.dark_300};
  padding: 1.6rem;
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.dark_100};

  transition: outline 0.3s ease-in-out;
  &:hover {
    outline: 2.8px solid ${({ theme }) => theme.colors.light_700};
  }

  position: relative;

  #favorite {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;

    color: ${({ theme }) => theme.colors.light_300};
    font-size: 3rem;
  }

  #card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.8rem;

    text-align: center;
    margin-top: 2.4rem;
    margin-bottom: 1.2rem;
  }

  @media ${devices.tablet} {
    max-height: fit-content;

    min-width: 25rem;
  }
  @media ${devices.desktop} {
    min-width: 30rem;
  }
`;

export const Image = styled.img`
  width: 10rem;
  height: 10rem;

  border-radius: 50%;

  @media ${devices.tablet} {
    width: 15rem;
    height: 15rem;
  }
  @media ${devices.desktop} {
    width: 17.6rem;
    height: 17.6rem;
  }
`;

export const Description = styled.p`
  display: none;
  @media ${devices.tablet} {
    display: flex;
    line-height: 160%;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.light_400};
  }
`;

export const Price = styled.div``;

export const Name = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  align-items: center;

  #chevron-right {
    /* margin-left: 0.2rem; */
    font-size: clamp(1.4rem, 4vw, 2rem);
  }

  h3 {
    font-size: clamp(1.4rem, 4vw, 2rem);
    line-height: 140%;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
  }

  @media ${devices.tablet} {
    /* min-height: max-content; */
  }
`;

export const LogicsContainer = styled.div`
  /* display: flex; */
  align-items: center;

  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-evenly; */
  /* align-self: baseline; */
  width: 100%;

  span {
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400;
    font-family: "Roboto", sans-serif;
    margin-top: 0.8rem;

    /* line-height: 160%; */

    color: ${({ theme }) => theme.colors.cyano};
  }

  @media ${devices.tablet} {
    /* flex-direction: row; */
    /* justify-content: space-between; */
    span {
      line-height: 160%;
    }
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.4rem;

  margin-bottom: 1.6rem;

  p {
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
  }

  &.desktop {
    display: none;
  }

  #buttons {
    font-size: x-large;
  }

  #buttons:active {
    transform: scale(0.9);
  }

  #buttons:hover {
    cursor: pointer;
  }

  @media ${devices.tablet} {
    &.desktop {
      display: flex;
    }

    &.mobile {
      display: none;
    }
  }
`;
