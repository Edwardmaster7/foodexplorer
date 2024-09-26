import styled from "styled-components";

export const App = styled.div`
  /* background-color: #F5F5F5; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Header = styled.header`
  display: flex;
  align-items: left;
  gap: 1.6rem;
  justify-content: baseline;
  width: 100%;
  padding: 3.6rem 2.8rem 2.4rem;
  /* border-bottom: 1px solid #ccc; */

  background-color: ${({ theme }) => theme.colors.dark_700};

  position: sticky;
  top: 0;
  z-index: 1000;

  font-family: "Roboto", sans-serif;
  font-size: 2.4rem;

  img {
    margin-bottom: 0.4rem;
  }

  #close:active {
    transform: scale(0.9);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: baseline;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 3.2rem 2.4rem 1.6rem;
  min-height: max-content;

  gap: 3.2rem;

  input {
    width: 100dw;
    /* max-width: 600px; */

    padding: 1.6rem 1.4rem;

    background-color: ${({ theme }) => theme.colors.dark_900};
  }

  .option {
    display: flex;

    padding: 0.1rem;

    font-family: "Poppins", "sans";
    font-size: 2.4rem;
    font-weight: lighter;
    line-height: 140%;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  max-height: 50vh;
  overflow-y: scroll;

  border-radius: 1rem;

  border: 0.3rem solid ${({ theme }) => theme.colors.dark_900};

  &:hover {
    border: 0.3rem solid ${({ theme }) => theme.colors.deep_green};
  }

  .result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;

    padding: 1.2rem;

    border-bottom: .2rem solid ${({ theme }) => theme.colors.dark_600};

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    background-color: ${({ theme }) => theme.colors.dark_400};

    &:last-child {
      border-bottom: none;
    }
  }

  .result h2 {
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
    font-weight: 500;
  }

  .result p {
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    line-height: 140%;
    font-weight: 400;

    color: ${({ theme }) => theme.colors.light_400};
  }

  .result a {
    font-family: "Poppins", sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.tunrs_green};
  }

  .result a:active {
    transform: scale(0.9);
  }
`;

// export const Footer = styled.footer`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   padding: 3.2rem 2.4rem;
//   gap: 0.8rem;

//   font-family: 'DM Sans', sans-serif;
//   font-size: 1rem;

//   background-color: ${({ theme }) => theme.colors.dark_600};

// `;
