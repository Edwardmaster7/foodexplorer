import styled from "styled-components";
import { devices } from "../../styles/theme"

export const Card = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* gap: 1.2rem; */
  justify-content: space-between;

  min-width: 21rem;
  height: 100%;

  min-height: fit-content;

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
    gap: 1.2rem;

    text-align: center;
    margin-top: 2.4rem;
    margin-bottom: 1.2rem;
  }

  #name {
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    align-items: center;
  }

  #chevron-right {
    /* margin-left: 0.2rem; */
    font-size: 1.4rem;
  }

  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
  }
  
  @media ${devices.tablet} {
    max-height: fit-content;
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
    font-size: 1.6rem;
    font-weight: 400;
    font-family: "Roboto", sans-serif;
    margin-top: 0.8rem;

    color: ${({ theme }) => theme.colors.cyano};
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

  #buttons {
    font-size: x-large;
  }

  #buttons:active {
    transform: scale(0.9);
  }

  #buttons:hover {
    cursor: pointer;
  }
`;
