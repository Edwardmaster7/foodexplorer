import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 3.2rem 2.4rem;
  gap: 0.8rem;

  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;

  background-color: ${({ theme }) => theme.colors.dark_600};

`;