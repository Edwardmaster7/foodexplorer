import styled from "styled-components";
import { devices } from "../../styles/theme";
import AutosizeInput from "react-input-autosize";

export const IngredientsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  min-width: 100%;
  max-width: 56vw;

  /* min-height: min-content; */
  background-color: ${({ theme }) => theme.colors.dark_900};

  overflow: auto;

  @media ${devices.tablet} {
    min-width: 56vw;
  }
`;

export const SelectedIngredientsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  overflow: auto;
  width: 100%;

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

    height: auto;

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

    @media ${devices.tablet} {
      padding: 0.8rem 1rem;
    }
  }
`;

export const Ingredient = styled.div`
  display: inline-flex; // Changed from flex to inline-flex
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light_600};
  padding: 0 1.6rem;
  border-radius: 0.8rem;
  height: auto;
  max-width: 100%; // Allow it to grow up to full width if needed
  position: relative;

  svg {
    position: static; // Changed from absolute
    margin-left: 0.8rem; // Add some space between input and icon
    cursor: pointer;
    color: ${({ theme }) => theme.colors.light_100};
  }

  @media ${devices.tablet} {
    padding: 0.8rem 1rem;
  }
`;

export const IngredientInputWrapper = styled.div``;

export const IngredientInput = styled(AutosizeInput)`
  input {
    background: none;
    outline: none;
    border: none;
    /* outline: dotted red; */
    /* padding: 0.8rem 1.6rem; */
    color: ${({ theme }) => theme.colors.light_100};
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    /* width: min-content; */
    /* max-width: 10vw; */
  }
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
