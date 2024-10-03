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
    padding: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 1.6rem;

  /* border: 1px solid yellow; */

  /* margin-top: 1.6rem; */

  label {
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_400};
  }

  .input {
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

  .error-message {
    color: red;
    font-size: 1rem;
    font-weight: 500;
    display: block; /* Ensure this is not set to 'none' */
  }

  .input.error {
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
  cursor: pointer;
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
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
`;

export const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  min-height: min-content;

  background-color: ${({ theme }) => theme.colors.dark_900};

  /* overflow: auto; */
`;

export const SelectedIngredientsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  overflow: auto;

  #add-ingredient,
  #add-new-ingredient {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    justify-content: center;

    border: none;
    border-radius: 0.8rem;
    background-color: transparent;
    padding: 1rem 1.6rem;

    border: dotted ${({ theme }) => theme.colors.light_600};

    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;

    svg {
      font-size: 1.8rem;
    }

    cursor: pointer;
    color: ${({ theme }) => theme.colors.light_100};

    transition: background-color 0.3s;
  }
`;

export const Ingredient = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.light_600};

  padding-right: 1.6rem;
  border-radius: 0.8rem;

  height: auto;
  min-width: min-content;

  position: relative;

  svg {
    position: absolute;
    right: 1.6rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.light_100};
  }
`;

export const IngredientInput = styled.input`
  background: none;
  border: none;
  outline: none;
  /* padding: 0.8rem 1.6rem; */
  padding-left: 1.6rem;
  color: ${({ theme }) => theme.colors.light_100};
  font-size: 1.6rem;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  width: min-content;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  border-radius: 0.8rem;

  &:focus-within {
    outline: 0.3rem solid ${({ theme }) => theme.colors.deep_green};
  }

  #filter-input-wrapper {
    width: 100%;
    position: relative;

    img {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 2rem;
    }
  }

  input {
    padding: 1rem 1.6rem;
    padding-left: 4rem;
    border-radius: 0.8rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0rem;

    font-size: 1.6rem;
    font-weight: 400;
    line-height: 160%;

    background-color: ${({ theme }) => theme.colors.dark_600};

    border-bottom: 0.4rem solid ${({ theme }) => theme.colors.dark_900};
  }

  input:focus {
    outline: none;
  }

  @media ${devices.tablet} {
    display: flex;
  }

  @media ${devices.desktop} {
    input {
      background-position: 25%;
    }
  }
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  /* position: absolute; */
  top: 100%; // This positions it right below the search input
  left: 0;
  width: 100%; // This makes it the same width as the search input
  /* max-height: 60vh; */
  overflow-y: auto;

  width: 100%;

  max-height: 30vh;

  /* z-index: 998; */

  border-radius: 1rem;

  border-top-left-radius: 0;
  border-top-right-radius: 0;

  border-top: transparent;

  /* &:hover {
    border: 0.3rem solid ${({ theme }) => theme.colors.deep_green};
  } */

  .result {
    /* display: inline-flex; */
    /* gap: 0.8rem; */

    padding: 1.2rem;

    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.dark_600};

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    background-color: ${({ theme }) => theme.colors.dark_400};

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const CustomOption = styled.a`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  margin: 0;

  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.light_400};
  /* margin-bottom: 0.5rem; */

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark_500};
    color: ${({ theme }) => theme.colors.light_100};
  }
`;
