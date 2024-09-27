import styled from "styled-components";
import { devices } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.4rem;

  /* margin-bottom: 1.6rem; */

  p {
    font-size: 2rem;
    font-family: "Roboto", sans-serif;
    /* font-size: 2rem; */
  }

  #buttons {
    font-size: 3.2rem;
  }

  #buttons:active {
    transform: scale(0.8);
    transition: transform 0.3s ease-in-out;
  }

  @media ${devices.tablet} {
    margin: 0 auto;
  }

  @media ${devices.desktop} {
    #buttons:hover {
      cursor: pointer;

      transition: outline 0.3s ease-in-out;
      color: ${({ theme }) => theme.colors.light_300};
    }
  }
`;