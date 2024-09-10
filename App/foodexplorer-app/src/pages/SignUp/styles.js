import styled from 'styled-components';
import theme from '../../styles/theme';

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
`;

export const Content = styled.div`
  #login-link {
    display: flex;
    justify-content: center;

    padding-top: 3.2rem;

    color: ${({ theme }) => theme.colors.light_100};
    font-size: 1.6rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  width: 100%;
  /* max-width: 50rem; */

  background-color: ${({ theme }) => theme.colors.dark_700};
  border-radius: 0.8rem;

`;

export const InputWrapper = styled.div`
  input {
    border: ${(props) => (props.isValid ? "" : `3px solid ${theme.colors.tomato_100}`)};
    
    /* height: 4.8rem; */
    padding: 1.4rem;
  }
  input:focus {
    outline: none;
    border: 3px solid ${({ theme }) => theme.colors.deep_green};
  }
`;
