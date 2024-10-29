import styled from "styled-components";
import { devices } from "../../styles/theme";

export const Card = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: space-between;

  min-width: 21rem;
  /* height: 100%; */

  /* min-height: max-content; */

  p {
    font-family: "Roboto", sans-serif;
  }

  background-color: ${({ theme }) => theme.colors.dark_300};
  padding: 2.4rem;
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.dark_100};

  transition: outline 0.3s ease-in-out;
  &:hover {
    outline: 2.8px solid ${({ theme }) => theme.colors.light_700};
  }

  position: relative;

  #favorite,
  #edit {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;

    color: ${({ theme }) => theme.colors.light_300};
    font-size: 3rem;

    cursor: pointer;
  }
  #favorite:hover,
  #edit:hover {
    transition: outline 0.3s ease-in-out;
    color: ${({ theme }) => theme.colors.light_100};
  }

  #favorite:active,
  #edit:active {
    transform: scale(0.8);
  }

  #card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;

    text-align: center;
    margin-top: 2.4rem;
    /* margin-bottom: 1.2rem; */
  }

  #card-logic {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    /* margin-top: 1.2rem; */
  }

  #mobile-include-button {
    display: block;
  }
  #desktop-include-button {
    display: none;

    button {
      font-size: 1.4rem;
      font-weight: medium;
      line-height: 2.4rem;
      padding: 1.2rem 2.4rem;
    }
  }

  @media ${devices.tablet} {
    /* max-height: max-content; */

    min-width: 25rem;

    #mobile-include-button {
      display: none;
    }

    #desktop-include-button {
      display: block;
    }
  }
  @media ${devices.desktop} {
    min-width: 30rem;
  }
`;

export const Image = styled.img`
  width: 12rem;
  height: 12rem;

  border-radius: 50%;
  object-fit: cover;

  @media ${devices.tablet} {
    width: 15rem;
    height: 15rem;
  }
  @media ${devices.desktop} {
    width: 16rem;
    height: 16rem;
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

export const Price = styled.span`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  font-size: clamp(2rem, 2vw, 2.4rem);
  font-weight: 400;
  font-family: "Roboto", sans-serif;

  /* line-height: 160%; */

  color: ${({ theme }) => theme.colors.cyano};

  @media ${devices.tablet} {
    /* line-height: 160%;  */
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  align-items: center;

  #chevron-right {
    /* margin-left: 0.2rem; */
    font-size: clamp(1.4rem, 4vw, 1.6rem);
  }

  h3 {
    font-size: clamp(1.4rem, 4vw, 1.6rem);
    line-height: 140%;
    font-weight: bold;
    font-family: "Poppins", sans-serif;
  }
  @media ${devices.tablet} {
    h3 {
      font-size: clamp(1.6rem, 4vw, 2rem);
    }
  }
`;

export const LogicsContainer = styled.div`
  display: flex;
  /* gap: 2rem; */
  align-items: center;
  flex-direction: column;
  width: 100%;

  /* > * {
    margin: 1.6rem; // Fallback for browsers that don't support gap
  }

  > *:last-child {
    margin-bottom: 0; // Remove margin from the last child
  } */

  @media ${devices.tablet} {
    display: grid;
    gap: 1.2rem;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-around;

    padding: 0 2.4rem;
    /* > * {
      margin: 0; // Reset margin for grid layout
    } */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-evenly; */
  /* align-self: baseline; */
  width: 100%;

  @media ${devices.tablet} {
    /* flex-direction: row; */
    /* justify-content: space-between; */
    gap: 1.6rem;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.4rem;

  /* margin-bottom: 1.6rem; */

  p {
    font-size: 2rem;
    font-family: "Roboto", sans-serif;
    /* font-size: 2rem; */
  }

  #buttons {
    font-size: 3.2rem;
  }

  #buttons:active {
    transform: scale(0.8);
    transition: transform 0.3s ease-in-out;
  }

  @media ${devices.tablet} {
    margin: 0 auto;
  }

  @media ${devices.desktop} {
    #buttons:hover {
      cursor: pointer;

      transition: outline 0.3s ease-in-out;
      color: ${({ theme }) => theme.colors.light_300};
    }
  }
`;
