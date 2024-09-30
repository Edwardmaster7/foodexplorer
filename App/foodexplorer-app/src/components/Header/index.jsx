import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  App,
  Container,
  OrderButton,
  SearchWrapper,
  ResultsWrapper,
  TopPadding
} from "./styles";

import menuIcon from "../../assets/icons/stack-menu.svg";
import receipt from "../../assets/icons/receipt.svg";
import logo from "../../assets/logo.svg";
import adminLogo from "../../assets/admin_logo_mobile.svg";
import adminLogoDesktop from "../../assets/admin_logo_desktop.svg";
import signOut from "../../assets/icons/sign_out.svg";

import InputField from "../InputField";
import ReceiptIcon from "../ReceiptIcon";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import { Link } from "react-router-dom";

import { debounce } from "lodash";

const Header = () => {
  const { signOut: signOutUser, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMeals, setSearchMeals] = useState([]);

  // Mechanism for closing the searchWrapper and cleaning the search input when the user clicks outside
  const searchWrapperRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target)
    ) {
      setSearchMeals([]);
      setSearchTerm("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Fetch teh search term results
  async function loadSearchMeals(searchTerm) {
    const { data } = await api.get(`/search/${searchTerm}`);
    setSearchMeals(data.dishes);
    console.log(searchMeals);
  }

  // Memorize the search term, and just call loadMeals
  // after 300 ms of the last change
  const debouncedSearch = useMemo(
    () => debounce((searchTerm) => loadSearchMeals(searchTerm), 300),
    []
  );

  // Handle search input change
  const handleSearch = (e) => {
    setSearchMeals([]);
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };

  // Create a memoized version of the ResultsWrapper component,
  // only re-rendering when the meals array changes
  const memorizedResultsWrapper = useMemo(() => {
    if (!searchMeals.length) return null;
    return (
      <ResultsWrapper>
        {searchMeals.map((meal) => (
          <Link key={meal.id} to="/" className="result">
            <h2>{meal.name}</h2>
            <p>{meal.description}</p>
          </Link>
        ))}
      </ResultsWrapper>
    );
  }, [searchMeals]);

  return (
    <>
      <TopPadding />
      <App>
        <Container>
          <Link id="menu" to="/menu">
            <img id="menu-img" src={menuIcon} alt="Menu" />
          </Link>
          <img
            id="logo"
            src={user.isAdmin ? adminLogo : logo}
            alt="foodexplorer logo"
          />
          <img
            id="logo-desktop"
            src={user.isAdmin ? adminLogoDesktop : logo}
            alt="foodexplorer logo"
          />
          <SearchWrapper ref={searchWrapperRef}>
            <InputField
              id="search-input"
              ref={searchWrapperRef}
              placeholder="Busque por pratos ou ingredientes"
              onChange={(e) => handleSearch(e)}
              value={searchTerm}
            />
            {memorizedResultsWrapper}
          </SearchWrapper>
          <OrderButton>
            {user.isAdmin ? (
              <>Novo prato</>
            ) : (<><img src={receipt} alt="ícone de comanda" />
            <p>Pedidos(0)</p></>)}
          </OrderButton>
          {user.isAdmin ? (
            <>
            </>
          ) : (
            <ReceiptIcon id="receipt" to="/menu" children={0} />
          )}
          <img id="sign-out" src={signOut} alt="" onClick={signOutUser} />
        </Container>
      </App>
    </>
  );
};

export default Header;
