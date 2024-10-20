import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { App, Container, Banner } from "./styles";

import DishWrapper from "../../components/DishWrapper";
import Header from "../../components/Header";

import macarons from "../../assets/macarons.png";

import { api } from "../../services/api";

import { useAuth } from "../../hooks/auth";
import { useOrder } from "../../hooks/order";

function Home() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);

  const { user } = useAuth();
  const { state, addItem, setCustomerID, getItemsSum } = useOrder();

  // Load categories from API
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");
      setCategories(data);
    }

    loadCategories();
  }, []);

  // Load dishes from API
  useEffect(() => {
    const loadDishes = async () => {
      try {
        const { data } = await api.get("/dishes");
        const dataWithQuantity = data.map((meal) => ({ ...meal, quantity: 1 }));
        setDishes(dataWithQuantity);
      } catch (error) {
        // check if the error is because of JWT
        if (error.response && error.response.status === 401) {
          // JWT expired or invalid, redirect to login
          window.location.href = "/";
        } else {
          console.error("Error loading dishes:", error);
          alert(
            `Erro ao carregar pratos.\nPor favor, tente novamente mais tarde.\n${error}`
          );
        }
      }
    };

    loadDishes();
  }, []);

  // load user favourites and link them to dishes
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const { data } = await api.get("/favourites");
        const favouriteIds = new Set(data.map((fav) => fav.id));

        setDishes((prevDishes) =>
          prevDishes.map((meal) => ({
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
        }
      }
    };

    // if (dishes.length > 0 && !dishes.every((meal) => meal.isFavourite)) {
    loadFavourites();
  }, [dishes]);

  // Load images for dishes only when necessary
  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedData = await Promise.all(
          dishes.map(async (meal) => {
            const image = `${api.defaults.baseURL}/files/${meal.image}`;
            return { ...meal, imgURL: image };
          })
        );
        setDishes(updatedData);
        // sessionStorage.setItem('@foodex:dishes', JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error loading images:", error);
        alert(
          `Erro ao carregar imagens.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    };

    // dishes.every(meal => meal.imgURL) ensures that we only update dishes if not all items already have an imgURL
    if (dishes.length > 0 && !dishes.every((meal) => meal.imgURL)) {
      loadImages();
    }
  }, [dishes]); // ensure that the useEffect only runs when dishes is updated

  // Memorize the filtered dishes for each category
  const memorizedCategoryDishes = useMemo(() => {
    if (categories.length === 0 || dishes.length === 0) return [];

    return categories.map((category) => ({
      ...category,
      dishes: dishes.filter((meal) => meal.category_name === category.name),
    }));
  }, [categories, dishes]);

  // Memorize the DishWrapper components
  const memorizedDishWrappers = useMemo(() => {
    const handleInclude = (dish) => {
      const item = {
        id: dish.id,
        name: dish.name,
        price: Number(dish.price).toFixed(2),
        quantity: dish.quantity,
        // imgURL: dish.imgURL,
      };

      if (user.id) {
        addItem(item);
        setCustomerID(user.id);
        // console.log(state)
        console.log(getItemsSum());
      } else {
        alert("Faça login para adicionar pratos ao carrinho");
      }
    };
    if (memorizedCategoryDishes.length === 0) return null;
    return memorizedCategoryDishes.map((category) => (
      <DishWrapper
        key={category.id}
        label={category.name}
        setData={setDishes}
        data={category.dishes}
        isAdmin={user.isAdmin}
        add={handleInclude}
      />
    ));
  }, [memorizedCategoryDishes]);

  return (
    <App>
      <Header />
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
