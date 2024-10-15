import { useState, useEffect, useMemo } from "react";
import {
  App,
  Container,
  Header,
  SearchWrapper,
  ResultsWrapper,
} from "./styles";

import { debounce } from "lodash";

import InputField from "../../components/InputField";
import Footer from "../../components/Footer";
import search from "../../assets/icons/search.svg";

import close from "../../assets/icons/close.svg";

import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

function Menu() {
  const { signOut, user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [dishes, setDishes] = useState([]);

  // Fetch teh search term results
  async function loadDishes(searchTerm) {
    const { data } = await api.get(`/search/${searchTerm}`);
    setDishes(data.dishes);
    // console.log(data.dishes);
  }

  // Memorize the search term, and just call loadDishes
  // after 300 ms of the last change
  const debouncedSearch = useMemo(
    () => debounce((searchTerm) => loadDishes(searchTerm), 300),
    []
  );

  // Handle search input change
  const handleSearch = (e) => {
    setDishes([]);
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };

  // Create a memoized version of the ResultsWrapper component,
  // only re-rendering when the dishes array changes
  const memorizedResultsWrapper = useMemo(() => {
    if (!dishes.length) return null;
    return (
      <ResultsWrapper>
        {dishes.map((dish) => (
          <Link key={dish.id} to={`/dish/${dish.id}`} className="result">
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
          </Link>
        ))}
      </ResultsWrapper>
    );
  }, [dishes]);

  const location = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    
    scrollToTop();
  }, [location]);

  return (
    <App>
      <Header>
        <Link id="close" to="/">
          <img src={close} alt="close menu" />
        </Link>
        Menu
      </Header>
      <Container>
        <SearchWrapper>
          <InputField
            icon={search}
            placeholder="Busque por pratos ou ingredientes"
            onChange={(e) => handleSearch(e)}
          />
          {memorizedResultsWrapper}
        </SearchWrapper>
        <div>
          {user.isAdmin ? (
            <Link to="/dish/new" className="option">
              Novo Prato
            </Link>
          ) : null}
          {/* {user.isAdmin ? (
            <Link to="/category/new" className="option">
              Nova Categoria
            </Link>
          ) : null} */}
          <Link to="/favourites" className="option">
            {user.isAdmin ? "Favoritados" :  "Meus Favoritos"}
          </Link>
          <Link to="/" onClick={signOut} className="option">
            Sair
          </Link>
        </div>
      </Container>
    </App>
  );
}

export default Menu;
