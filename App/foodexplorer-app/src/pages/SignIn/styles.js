import styled from 'styled-components';
import theme, { devices } from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: left;
  height: 100vh;
  width: 100vw;

  padding-top: 15.8rem;
  padding-right: 4.7rem;
  padding-left: 6.5rem;

  gap: 7.2rem;

  @media ${devices.tablet} {
    display: grid;

    grid-template-columns: 1fr 1fr;

    padding: 14.2rem 10.8rem;
    
    #logo {
      h1 {
        font-size: 4.8rem;
        font-weight: 600;
      }

      img {
        width: 4.8rem;
        height: 4.8rem;
      }
    }
  }

`;

export const Content = styled.div`
  #create-account-link {
    display: flex;
    justify-content: center;

    margin-top: 3.2rem;

    color: ${({ theme }) => theme.colors.light_100};
    font-size: 1.6rem;
  }

  @media ${devices.tablet} {
    background-color: ${({ theme }) => theme.colors.dark_700};
    padding: 6.4rem;

    border-radius: 1.6rem;

  }
`;

export const Title = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  @media ${devices.tablet} {
    display: flex;
  }
  h1 {
      font-size: 3.2rem;
      font-weight: 500;

      display: flex;
    }
    h2 {
      font-size: 1.6rem;
      font-weight: 400;

      color: ${({ theme }) => theme.colors.light_300};

      display: flex;

      padding-bottom: 2.4rem;
    }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  width: 100%;
  /* max-width: 50rem; */

  border-radius: 0.8rem;

`;

export const InputWrapper = styled.div`
  input {
    outline: ${(props) => (props.isValid ? "" : `3px solid ${theme.colors.tomato_100}`)};
  
    height: 4.8rem;
    padding: 1.4rem;
  }
  input:focus {
    outline: none;
    outline: 3px solid ${({ theme }) => theme.colors.deep_green};
  }
`;
