import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;

  label {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.light_400};
    margin-bottom: 0.8rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  input {
    width: 100%;
    padding: 0.8rem;

    border: none;
    border-radius: 0.8rem;

    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;

    color: ${({ theme }) => theme.colors.light_100};
    background-color: ${({ theme }) => theme.colors.dark_900};
  }

  input:placeholder {
    color: ${({ theme }) => theme.colors.light_500};
  }
`;