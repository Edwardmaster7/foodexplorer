import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* border: 1px solid red; */
  /* height: 100vh; */
  gap: 1rem;
  max-width: fit-content;

  img {
    width: 4rem;
    height: 4rem;
    /* border-radius: 50%; */
  }

  /* @media (max-width: 768px) {
    flex-direction: column;
  } */

  h1 {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.light_100};
    margin-bottom: 0.3rem;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }
`;