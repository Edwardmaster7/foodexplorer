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

  @media ${devices.tablet} {
    margin: 2.4rem 5.2rem 5.6rem 12.4rem;

    align-items: flex-start;
    justify-content: left;

    #forward-button {
      display: none;
    }

    #mobile-total-price {
      display: none;
    }
  }
  @media ${devices.desktop} {
    margin: 3.4rem 19.6rem 12.3rem 12.3rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-items: left;

  /* border: 1px solid green; */

  width: 100%;

  h1 {
    text-align: left;

    font-size: 3.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light_300};
  }

  @media ${devices.tablet} {
    /* border: 1px solid green; */
    justify-content: space-between;
    gap: 4.8rem;
    flex-direction: row;
  }
`;

export const PaymentContainer = styled.div`
  display: none;
  flex-direction: column;
  gap: 2.4rem;

  @media ${devices.tablet} {
    display: flex;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 65dvh;
  max-height: max-content;

  /* border: 1px solid green; */

  h2 {
    margin-top: 2rem;

    font-family: "Poppins", sans-serif;
    font-size: 2.4rem;
    line-height: 160%;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_400};
  }

  h3 {
    /* margin: 1rem 0 0; */

    font-size: 2rem;
    line-height: 160%;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light_300};
  }

  #total-price {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .desktop-total-price {
    display: none;
  }

  .mobile-total-price {
    display: flex;
  }

  @media ${devices.tablet} {
    h2 {
      margin-top: 0;
    }
    /* border: 1px solid green; */
    display: grid;
    gap: 4.8rem;
    row-gap: 4.8rem;

    .desktop-total-price {
      display: flex;
    }
    .mobile-total-price {
      display: none;
    }
  }
`;

export const Order = styled.div`
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
  }

  .title span {
    display: none;
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
    font-weight: 400;
    text-align: left;

    max-width: fit-content;

    color: ${({ theme }) => theme.colors.tomato_400};
  }

  #edit {
    color: ${({ theme }) => theme.colors.light_400};
  }

  @media ${devices.tablet} {
    /* border: 1px solid green; */

    flex-direction: row;

    .content {
      gap: 0.2rem;
    }

    .title {
      display: flex;
      gap: 1rem;
    }

    .title span {
      display: flex;
      align-items: center;

      font-family: "Roboto", sans-serif;
      font-size: 1.2rem;
      line-height: 160%;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.light_400};
    }

    gap: 2.4rem;
  }
`;

export const Empty = styled.div`
  display: grid;
  /* gap: 4.8rem; */
  /* row-gap: 4.8rem; */
  grid-template-columns: .1fr 1fr .1fr;
  place-items: center;
  justify-content: center;

  height: 40dvh;
  width: 100%;
  max-width: max-content;

  margin: 0;

  outline: 2.8px solid ${({ theme }) => theme.colors.light_700};
  border-radius: 0.8rem;

  gap: 2.4rem;

  h3 {
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.light_300};

    grid-column: 2;
  }

  @media ${devices.tablet} {
    /* border: 1px solid green; */
    display: grid;
    /* grid-template-columns: repeat(3, 1fr); */

    h3 {
      grid-column: 2;
    }
  }
`;
