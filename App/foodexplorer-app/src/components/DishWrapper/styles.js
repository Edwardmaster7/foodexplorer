import styled from "styled-components";
import { devices } from "../../styles/theme";

export const Container = styled.div`
  width: 100%;

  /* height: 100%; */
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  /* background-color: ${({ theme }) => theme.colors.light_300}; */

  h1 {
    font-size: 1.8rem;
    font-weight: medium;
    font-family: "Poppins", sans-serif;
    margin-bottom: 2.4rem;
    line-height: 140%;
  }

  #right, #left {
    display: none;
  }

  @media ${devices.desktop} {

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;

      position: relative;

      font-size: 3rem;
    }

    #right {
      display: flex;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      height: 100%;

      position: absolute;
      right: 0;
    }
    #left {
      display: flex;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      position: absolute;
      left: 0;
      z-index: 1;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(30, 1fr);
  grid-auto-flow: row;

  overflow-y: scroll;

  gap: 1.6rem;
  padding: 0.5rem;
`;
