import styled from "styled-components";
import theme, { devices } from "../../styles/theme";

export const Container = styled.div`
  width: 100%;

  height: max-content;

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
  @media ${devices.tablet} {
    h1 {
      font-size: 2.4rem;
      font-weight: medium;
    }
  }

  @media ${devices.desktop} {

    h1 {
      font-size: 3.2rem;
      font-weight: medium;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;

      font-size: 3rem;
      
    }

    #right {
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 10%, ${theme.colors.dark_400});
      height: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 1rem;
      padding-left: 8rem;

      /* background-color: red; */

      position: absolute;
      right: 0;
      z-index: 1;
    }
    #left {
      background-image: linear-gradient(to right, ${theme.colors.dark_400} 10%, rgba(0, 0, 0, 0));
      height: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 1rem;
      padding-right: 8rem;

      /* background-color: red; */

      position: absolute;
      /* left: 0; */
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
