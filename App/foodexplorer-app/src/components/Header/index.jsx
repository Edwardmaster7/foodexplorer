import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import {
  App,
  Container,
  OrderButton,
  SearchWrapper,
  ResultsWrapper,
  TopPadding,
} from "./styles";

import menuIcon from "../../assets/icons/stack-menu.svg";
import receipt from "../../assets/icons/receipt.svg";
import logo from "../../assets/logo.svg";
import adminLogo from "../../assets/admin_logo_mobile.svg";
import adminLogoDesktop from "../../assets/admin_logo_desktop.svg";
import signOut from "../../assets/icons/sign_out.svg";

import InputField from "../InputField";
import ReceiptIcon from "../ReceiptIcon";

import { FaHeart } from "react-icons/fa";

import { useAuth } from "../../hooks/auth";
import { useOrder } from "../../hooks/order";

import { api } from "../../services/api";

import { Link } from "react-router-dom";

import { debounce } from "lodash";

const Header = () => {
  const { signOut: signOutUser, user } = useAuth();
  const { state, getItemsSum } = useOrder();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDishes, setSearchDishes] = useState([]);

  // Mechanism for closing the searchWrapper and cleaning the search input when the user clicks outside
  const searchWrapperRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target)
    ) {
      setSearchDishes([]);
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
  async function loadSearchDishes(searchTerm) {
    const { data } = await api.get(`/search/${searchTerm}`);
    setSearchDishes(data.dishes);
    console.log(searchDishes);
  }

  // Memorize the search term, and just call loadDishes
  // after 300 ms of the last change
  const debouncedSearch = useMemo(
    () => debounce((searchTerm) => loadSearchDishes(searchTerm), 300),
    []
  );

  // Handle search input change
  const handleSearch = (e) => {
    setSearchDishes([]);
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };

  // Create a memoized version of the ResultsWrapper component,
  // only re-rendering when the dishes array changes
  const memorizedResultsWrapper = useMemo(() => {
    if (!searchDishes.length) return null;
    return (
      <ResultsWrapper>
        {searchDishes.map((dish) => (
          <Link
            key={dish.id}
            to={`/dish/${dish.id}`}
            className="result"
            onClick={handleClickOutside}
          >
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
          </Link>
        ))}
      </ResultsWrapper>
    );
  }, [searchDishes]);

  const itemsSum = useMemo(() => {
    return getItemsSum();
  }, [state, getItemsSum]);

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

          <Link to="/favourites" className="option">
            <FaHeart />
          </Link>
          
          <OrderButton
            onClick={() => {
              window.location.href = "/dish/new";
            }}
          >
            {user.isAdmin ? (
              <>Novo prato</>
            ) : (
              <>
                <img src={receipt} alt="ícone de comanda" />
                <p>Pedidos({itemsSum})</p>
              </>
            )}
          </OrderButton>
          {user.isAdmin ? (
            <></>
          ) : (
            <ReceiptIcon id="receipt" to="/menu" children={itemsSum} />
          )}
          <img id="sign-out" src={signOut} alt="" onClick={signOutUser} />
          {user.isAdmin ? <div id="padding-mobile-admin" /> : null}
        </Container>
      </App>
    </>
  );
};

export default Header;
