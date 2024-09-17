import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  /* background-color: ${({ theme }) => theme.colors.light_300}; */

  h1 {
    font-size: 1.8rem;
    font-weight: medium;
    font-family: "Poppins", sans-serif;
    margin-bottom: 2.4rem;
    line-height: 140%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: row;

  overflow-y: scroll;

  gap: 1.6rem;
  /* padding: 0 10rem; */
`;

export const Card = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* gap: 1.2rem; */
  justify-content: space-between;

  min-width: 20rem;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.dark_300};
  padding: 1.6rem;
  border-radius: 0.8rem;
  border: 2px solid ${({ theme }) => theme.colors.dark_100};

  transition: border 0.3s ease-in-out;
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.light_700};
  }

  #card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;

    text-align: center;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  flex-direction: column;
  /* justify-content: space-evenly; */
  /* align-self: baseline; */
  width: 100%;

  #quantity p {
    font-size: 1.2rem;
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
  }

  #quantity {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.4rem;

    margin-bottom: 1.6rem;
  }

  span {
    font-size: 1.4rem;
    font-weight: 400;
    font-family: "Roboto", sans-serif;
    margin-top: 0.8rem;

    color: ${({ theme }) => theme.colors.cyano};
  }

  #buttons {
    font-size: x-large;
  }
`;
