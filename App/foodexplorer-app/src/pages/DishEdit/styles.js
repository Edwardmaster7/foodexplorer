import styled from "styled-components";

import theme, { devices } from "../../styles/theme";

export const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;

  margin: 1.6rem 3.2rem;
  margin-bottom: 5.6rem;

  /* border: 1px solid red; */

  min-height: 80vh;

  gap: 2.4rem;

  h1 {
    font-family: "Poppins", sans-serif;
    font-size: 3.2rem;
    font-weight: 500;
    text-align: baseline;

    width: 100%;

    color: ${({ theme }) => theme.colors.light_100};
  }

  #button-link {
    width: 100%;
  }

  #submit-btn {
    width: 100%;

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
  }

  #submit-btn:disabled {
    background-color: ${({ theme }) => theme.colors.tomato_400};
    cursor: not-allowed;
  }

  @media ${devices.tablet} {
    padding: 4rem 8rem;
    padding-bottom: 7rem;

    h1 {
      padding-bottom: 1.6rem;
    }
  }

  @media ${devices.desktop} {
    padding-right: 10rem;
    padding-left: 10rem;
    padding-bottom: 9rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.light_100};
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  /* border: 1px solid red; */

  @media ${devices.tablet} {
    margin-left: 0;
    font-weight: bold;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;

  width: 100%;

  /* border: 1px solid magenta; */

  > div {
    width: 100%;
  }

  @media ${devices.tablet} {
    gap: 3.2rem;
  }
`;

export const FieldsetOne = styled.fieldset`
  border: none;
  outline: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 1.6rem;

  /* border: 1px solid red; */

  > div {
    width: 100%;
  }

  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.2rem;
  }
`;

export const FieldsetTwo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media ${devices.tablet} {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: 3.2rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  /* justify-content: center; */
  gap: 1.6rem;

  /* border: 1px solid yellow; */

  /* margin-top: 1.6rem; */

  label {
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_400};
  }

  .input,
  .input-img,
  .input-ingredient {
    width: 100%;
    padding: 1.4rem;
    border: none;
    border-radius: 0.8rem;
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_100};

    background-color: ${({ theme }) => theme.colors.dark_900};
  }

  @media ${devices.tablet} {
    .input-img,
    .input-ingredient {
      padding: 1rem;
    }
  }

  .error-message, .ingredients-error-message, .price-error-message {
    color: red;
    font-size: 1rem;
    font-weight: 500;
    display: block; /* Ensure this is not set to 'none' */
  }

  .input.error, .input-ingredient.error {
    outline: ${(props) =>
      props.isValid ? "" : `3px solid ${theme.colors.tomato_100}`};
  }

  .input::placeholder {
    color: ${({ theme }) => theme.colors.light_500};
  }
  /* .input::selection {
    background-color: ${({ theme }) => theme.colors.deep_green};
    color: ${({ theme }) => theme.colors.light_500};
  } */
  .input:focus {
    outline: 3px solid ${({ theme }) => theme.colors.deep_green};
  }

  #description {
    overflow-y: auto;
    resize: none;
  }

  @media ${devices.tablet} {

    .error-message {
      position: absolute;
      bottom: -2.4rem;
      font-size: 1.2rem;
    }

    .ingredients-error-message, .price-error-message {
      font-size: 1.2rem;
    }
  }
`;

export const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &::-ms-expand {
    display: none;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;

    font-size: 2rem;
  }
`;

export const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
`;

export const FileInput = styled.input`
  font-size: 1rem;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  /* padding: 1rem 2rem; */
  background-color: #0d161b;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #192227;
  }

  p {
    color: ${({ theme }) => theme.colors.light_100};
  }

  svg {
    color: ${({ theme }) => theme.colors.light_100};
    font-size: 3rem;
    margin-right: 1rem;
    margin-left: 1.6rem;
  }

  img {
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  @media ${devices.tablet} {
    padding: none;
    p {
      font-size: 1.6rem;
    }

    img {
      height: 5rem;
      width: 5rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3.2rem;

  button {
    font-size: 1.4rem;
  }

  #delete-btn {
    grid-column: 3;
  }

  #submit-btn {
    width: 100%;

    grid-column: 4;

    cursor: pointer;
    width: 100%;
    height: 4.8rem;

    background-color: ${({ theme }) => theme.colors.tomato_100};

    border: none;
    border-radius: 0.8rem;

    color: ${({ theme }) => theme.colors.light_100};
    font-size: 1.3rem;
    font-weight: 500;

    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.tomato_200};
    }
  }

  #submit-btn:disabled {
    background-color: ${({ theme }) => theme.colors.tomato_400};
    cursor: not-allowed;
  }

  #delete-btn {
    button {
      background-color: ${({ theme }) => theme.colors.dark_800};
    }
  }

  @media ${devices.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 1.6rem;

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 2rem;

      max-width: fit-content;
    }
  }
`;
