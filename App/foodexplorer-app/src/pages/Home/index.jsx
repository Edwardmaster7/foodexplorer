import { useState, useEffect, useMemo } from "react";
import { App, Header, Container, Banner } from "./styles";

import { Link } from "react-router-dom";

import ReceiptIcon from "../../components/ReceiptIcon";
import Logo from "../../components/Logo";
import DishWrapper from "../../components/DishWrapper";

import menuIcon from "../../assets/icons/stack-menu.svg";
import macarons from "../../assets/macarons.png";

import { api } from "../../services/api";

function Home() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [order, setOrder] = useState([]);

  // Load categories from API or sessionStorage
  useEffect(() => {
    async function loadCategories() {
      // const storedCategories = sessionStorage.getItem('@foodex:categories');
      // if (storedCategories) {
      //   setCategories(JSON.parse(storedCategories));
      // } else {
      //   const { data } = await api.get("/categories");
      //   setCategories(data);
      //   sessionStorage.setItem('@foodex:categories', JSON.stringify(data));
      // }
      const { data } = await api.get("/categories");
      setCategories(data);
    }

    loadCategories();
  }, []);

  // Load meals from API or sessionStorage
  useEffect(() => {
    const loadMeals = async () => {
      // const storedMeals = sessionStorage.getItem('@foodex:meals');
      // if (storedMeals) {
      //   setMeals(JSON.parse(storedMeals));
      // } else {
      //   const { data } = await api.get("/dishes");
      //   const dataWithQuantity = data.map((meal) => ({ ...meal, quantity: 1 }));
      //   setMeals(dataWithQuantity);
      // }
      try {
      const { data } = await api.get("/dishes");
      const dataWithQuantity = data.map((meal) => ({ ...meal, quantity: 1 }));
      setMeals(dataWithQuantity);
      } catch (error) {
        console.error("Error loading meals:", error);
        alert(
          `Erro ao carregar pratos.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    }

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
        console.error("Error loading favourites:", error);
        alert(
          `Erro ao carregar os favoritos.\nPor favor, tente novamente mais tarde.\n${error}`
        );
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
      />
    ));
  }, [memorizedCategoryMeals]);

  return (
    <App>
      <Header>
        <Link to="/menu">
          <img id="menu" src={menuIcon} alt="Menu" />
        </Link>
        <Logo id="logo" />
        <ReceiptIcon to="/menu" children={0} />
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
              Sinta o cuidado do preparo com
              <br />
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
