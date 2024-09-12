import styled from "styled-components";

export const Container = styled.div`
  .wrapper {
    position: absolute;
  }
  margin-bottom: -1rem;

  .circle-wrapper {
    position: relative;
    top: -0.48rem;
    left: 1.5rem;
  }
  img {
    margin: 0;
  }
`;

export const Circle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.tomato_100};

  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;

  display: flex;

  align-items: center;
  justify-content: center;
`;
