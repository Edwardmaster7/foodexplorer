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
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;