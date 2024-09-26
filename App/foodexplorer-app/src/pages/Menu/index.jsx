import { useEffect, useState, useMemo } from "react";
import {
  App,
  Container,
  Header,
  SearchWrapper,
  ResultsWrapper,
  IngredientsWrapper,
} from "./styles";

import { debounce } from "lodash"; // You'll need to install lodash

import InputField from "../../components/InputField";
import Footer from "../../components/Footer";
import search from "../../assets/icons/search.svg";

import close from "../../assets/icons/close.svg";

import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

function Menu() {
  const { signOut, user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);

  // Fetch teh search term results
  async function loadMeals(searchTerm) {
    const { data } = await api.get(`/search/${searchTerm}`);
    setMeals(data.dishes);
    // console.log(data.dishes);
  }

  // Memorize the search term, and just call loadMeals 
  // after 300 ms of the last change
  const debouncedSearch = useMemo(
    () => debounce((searchTerm) => loadMeals(searchTerm), 300),
    []
  );

  // Handle search input change
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };

  // Create a memoized version of the ResultsWrapper component,
  // only re-rendering when the meals array changes
  const memorizedResultsWrapper = useMemo(() => {
    if (!meals.length) return null;
    return (
       <ResultsWrapper>
         {meals.map((meal) => (
           <Link to="/" className="result">
             <h2>{meal.name}</h2>
             <p>{meal.description}</p>
           </Link>
         ))}
       </ResultsWrapper>
     );
  }, [meals]);

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
            <Link to="/" className="option">
              Novo Prato
            </Link>
          ) : null}
          <Link to="/" onClick={signOut} className="option">
            Sair
          </Link>
        </div>
      </Container>
    </App>
  );
}

export default Menu;
