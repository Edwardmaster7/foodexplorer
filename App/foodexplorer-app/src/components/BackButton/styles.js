import styled from "styled-components";
import { devices } from "../../styles/theme";

export const Container = styled.div`
  background: none;
  border: none;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.light_400};
  /* margin-bottom: 2.4rem; */
  cursor: pointer;

  display: inline-flex;
  align-items: center;

  > div:active {
    transition: transform 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;

    transform: scale(0.8);
    color: ${({ theme }) => theme.colors.light_100};
  }

  > div:hover {
    color: ${({ theme }) => theme.colors.light_100};
  }

  svg {
    margin-right: .6rem;
  }

  @media ${devices.tablet} {
    margin-left: 0;
    font-weight: bold;
    /* border: 1px solid red; */
  }
`;
