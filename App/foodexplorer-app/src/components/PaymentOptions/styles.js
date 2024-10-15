import styled from "styled-components";
import { devices } from "../../styles/theme";

import InputField from "../InputField";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PaymentOptionsWrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
`;

export const PaymentOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.light_400};

  &.selected {
    background-color: ${({ theme }) => theme.colors.dark_700};
  }

  &:nth-child(1) {
    border-top-left-radius: 0.8rem;
  }

  &:nth-child(2) {
    border-top-right-radius: 0.8rem;
  }
`;

export const PaymentOptionText = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.4rem;

  p {
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    line-height: 160%;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.light_400};
  }
`;

export const PaymentInfo = styled.div`
  /* background-color: aliceblue; */

  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.light_400};

  .pix {
    padding: 4.7rem 10.8rem;
  }

  .credit {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 3.2rem;

    padding: 6rem 6rem;

    .credit-inputs {
      display: flex;
      flex-direction: row;
      gap: 3.2rem;
    }

    button {
      display: flex;
      place-content: center;
      align-items: center;
      flex-direction: row;
      gap: 1rem;

      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2.4rem;

      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 100%;

  label {
    color: ${({ theme }) => theme.colors.light_400};
  }

  input {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.light_400};
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.colors.light_100};

    padding: 1.2rem 1.4rem;

    &:focus {
      /* border: 1px solid ${({ theme }) => theme.colors.light_400}; */
      outline: 2.8px solid ${({ theme }) => theme.colors.light_700};
    }
  }
`;
