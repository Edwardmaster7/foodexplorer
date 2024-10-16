import styled from "styled-components";
import { devices } from "../../styles/theme";

export const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: top;

  min-height: 80vh;

  gap: 2.4rem;

  margin: 1.6rem 3.2rem 5.6rem 2.4rem;

  /* border: 1px solid red; */

  #button-link {
    /* border: 1px solid   red; */

    width: 100%;
  }
  @media ${devices.tablet} {
    margin: 2.4rem 5.2rem 5.6rem 12.4rem;

    align-items: flex-start;
    justify-content: left;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: left;

  h1 {
    text-align: left;

    font-size: 3.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light_300};
  }

  @media ${devices.tablet} {
    /* border: 1px solid green; */
    gap: 2.4rem;
  }
`;

export const FavouritesWrapper = styled.div`
  h2 {
    margin-top: 2rem;

    font-family: "Poppins", sans-serif;
    font-size: 2.4rem;
    line-height: 160%;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_400};
  }
  @media ${devices.tablet} {
    h2 {
      margin-top: 0;
    }
    /* border: 1px solid green; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4.8rem;
    row-gap: 4.8rem;
  }
  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CategoriesWrapper = styled.div`
  h2 {
    margin-top: 2rem;

    font-family: "Poppins", sans-serif;
    font-size: 2.4rem;
    line-height: 160%;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_400};
  }
  @media ${devices.tablet} {
    h2 {
      margin-top: 0;
    }
    /* border: 1px solid green; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4.8rem;
    row-gap: 4.8rem;
  }
  @media ${devices.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Favourite = styled.div`
  display: flex;
  place-items: center;
  justify-content: space-between;

  /* border: 1px solid red; */
  border-radius: 0.8rem;

  padding: 0.8rem;
  &:hover {
    outline: 2.8px solid ${({ theme }) => theme.colors.light_700};
  }

  padding-top: 2rem;
  padding-bottom: 2rem;

  .info {
    display: flex;
    flex-direction: row;
    place-items: center;
    gap: 1.6rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  img {
    height: 7.2rem;
    width: 7.2rem;
    border-radius: 50%;
    object-fit: cover;
  }

  h3 {
    font-size: 2rem;
    line-height: 160%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light_300};
  }

  a {
    font-family: "Roboto", sans-serif;
    font-size: 1.4rem;
    line-height: 160%;

    max-width: fit-content;

    font-weight: 400;
    text-align: left;

    color: ${({ theme }) => theme.colors.tomato_400};
  }

  #edit {
    color: ${({ theme }) => theme.colors.light_400};
  }

  @media ${devices.tablet} {
    /* border: 1px solid green; */

    flex-direction: row;
    /* align-items: flex-start; */
    /* justify-content: left; */

    gap: 2.4rem;
  }
`;

export const FavouriteCount = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 1.4rem;
  line-height: 160%;
  font-weight: 400;
  text-align: left;

  display: inline-flex;
  gap: 0.4rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.light_500};
`;
