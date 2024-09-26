import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  App,
  Header,
  Container,
  Banner,
  SearchWrapper,
  ResultsWrapper,
  OrderButton,
} from "./styles";

import { Link } from "react-router-dom";

import ReceiptIcon from "../../components/ReceiptIcon";
import Logo from "../../components/Logo";
import DishWrapper from "../../components/DishWrapper";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

import menuIcon from "../../assets/icons/stack-menu.svg";
import macarons from "../../assets/macarons.png";
import searchIcon from "../../assets/icons/search.svg";
import receipt from "../../assets/icons/receipt.svg";
import logo from "../../assets/logo.svg";
import adminLogo from "../../assets/admin_logo_mobile.svg";
import adminLogoDesktop from "../../assets/admin_logo_desktop.svg";
import signOut from "../../assets/icons/sign_out.svg";

import { api } from "../../services/api";

import { debounce } from "lodash";

import { useAuth } from "../../hooks/auth";

function Home() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMeals, setSearchMeals] = useState([]);
  const [order, setOrder] = useState([]);

  const { signOut: signOutUser, user } = useAuth();

  // Load categories from API
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");
      setCategories(data);
    }

    loadCategories();
  }, []);

  // Load meals from API
  useEffect(() => {
    const loadMeals = async () => {
      try {
        const { data } = await api.get("/dishes");
        const dataWithQuantity = data.map((meal) => ({ ...meal, quantity: 1 }));
        setMeals(dataWithQuantity);
      } catch (error) {
        // check if the error is because of JWT
        if (error.response && error.response.status === 401) {
          // JWT expired or invalid, redirect to login
          window.location.href = "/";
        } else {
          console.error("Error loading meals:", error);
          alert(
            `Erro ao carregar pratos.\nPor favor, tente novamente mais tarde.\n${error}`
          );
        }
      }
    };

    loadMeals();
  }, []);

  // load user favourites and link them to dishes
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const { data } = await api.get("/favourites");
        const favouriteIds = new Set(data.map((fav) => fav.id));

        setMeals((prevMeals) =>
          prevMeals.map((meal) => ({
            ...meal,
            isFavorite: favouriteIds.has(meal.id),
          }))
        );
      } catch (error) {
        // check if the error is because of JWT
        if (error.response && error.response.status === 401) {
          // JWT expired or invalid, redirect to login
          window.location.href = "/";
        } else {
          console.error("Error loading favourites:", error);
          alert(
            `Erro ao carregar os favoritos.\nPor favor, tente novamente mais tarde.\n${error}`
          );
        }
      }
    };

    // if (meals.length > 0 && !meals.every((meal) => meal.isFavourite)) {
    loadFavourites();
  }, []);

  // Load images for meals only when necessary
  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedData = await Promise.all(
          meals.map(async (meal) => {
            const image = `${api.defaults.baseURL}/files/${meal.image}`;
            return { ...meal, imgURL: image };
          })
        );
        setMeals(updatedData);
        // sessionStorage.setItem('@foodex:meals', JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error loading images:", error);
        alert(
          `Erro ao carregar imagens.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    };

    // meals.every(meal => meal.imgURL) ensures that we only update meals if not all items already have an imgURL
    if (meals.length > 0 && !meals.every((meal) => meal.imgURL)) {
      loadImages();
    }
  }, [meals]); // ensure that the useEffect only runs when meals is updated

  // Memorize the filtered meals for each category
  const memorizedCategoryMeals = useMemo(() => {
    if (categories.length === 0 || meals.length === 0) return [];

    return categories.map((category) => ({
      ...category,
      meals: meals.filter((meal) => meal.category_name === category.name),
    }));
  }, [categories, meals]);

  // Memorize the DishWrapper components
  const memorizedDishWrappers = useMemo(() => {
    if (memorizedCategoryMeals.length === 0) return null;
    return memorizedCategoryMeals.map((category) => (
      <DishWrapper
        key={category.id}
        label={category.name}
        setData={setMeals}
        data={category.meals}
        isAdmin={user.isAdmin}
      />
    ));
  }, [memorizedCategoryMeals]);
  
  
  // Mechanism for closing the searchWrapper and cleaning the search input when the user clicks outside
  const searchWrapperRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
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
    setSearchMeals([])
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
    <App>
      <div id="header-top-padding"></div>
      <Header>
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
          <img src={receipt} alt="ícone de comanda" />
          Pedidos(0)
        </OrderButton>
        {user.isAdmin ? (
          <div />
        ) : (
          <ReceiptIcon id="receipt" to="/menu" children={0} />
        )}
        <img id="sign-out" src={signOut} alt="" onClick={signOutUser} />
      </Header>
      <Banner>
        <div id="wrapper">
          <img src={macarons} alt="Ilustration of macarons and fruits" />
        </div>
        <div id="rectangle">
          <div></div>
          <div id="banner-text">
            <h1>Sabores inigualáveis</h1>
            <p>
              Sinta o cuidado do preparo com <br />
              ingredientes selecionados.
            </p>
          </div>
        </div>
      </Banner>
      <Container>{memorizedDishWrappers}</Container>
    </App>
  );
}

export default Home;
