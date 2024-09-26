import styled from "styled-components";

export const Container = styled.button`
  cursor: pointer;
  width: 100%;
  height: 4.8rem;
  
  background-color: ${({ theme }) => theme.colors.tomato_100};

  border: none;
  border-radius: 0.8rem;

  color: ${({ theme }) => theme.colors.light_100};
  font-size: 1.6rem;
  font-weight: 500;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.tomato_200};
  }
`;