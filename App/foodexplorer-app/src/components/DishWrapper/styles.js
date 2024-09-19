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
  grid-template-columns: repeat(30, 1fr);
  grid-auto-flow: row;

  overflow-y: scroll;

  gap: 1.6rem;
  padding: 0.5rem;
`;

