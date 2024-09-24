import styled from "styled-components";
import { devices } from "../../styles/theme";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3.2rem 2.4rem;
  /* gap: 0.8rem; */

  img {
    height: 2rem;
  }

  font-family: "DM Sans", sans-serif;
  font-size: 1rem;

  background-color: ${({ theme }) => theme.colors.dark_600};

  @media ${devices.tablet} {
    padding: 2.4rem 12.8rem;
    font-size: 1.4rem;

    img {
      height: 2.8rem;
    }
  }
`;

