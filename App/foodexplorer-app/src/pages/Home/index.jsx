import { useState, useEffect } from "react";
import { App, Header, Container, Banner } from "./styles";

import { Link } from "react-router-dom";

import ReceiptIcon from "../../components/ReceiptIcon";
import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import DishWrapper from "../../components/DishWrapper";

import menuIcon from "../../assets/icons/stack-menu.svg";
import macarons from "../../assets/macarons.png";
import dish from "../../assets/dish.png";

import { api } from "../../services/api";

function Home() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [mealsByCategory, setMealsByCategory] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get("/categories");

      setCategories(data);
    }

    async function loadMeals() {
      const { data } = await api.get("/dishes");

      setMeals(data);
    }

    async function loadMealsByCategory() {
      const groupedMeals = categories.map(category => ({
        ...category,
        meals: meals.filter(meal => meal.categoryId === category.id)
      }));

      setMealsByCategory(groupedMeals);
    }

    loadCategories();

    loadMeals();

    loadMealsByCategory();
  }, []);

  console.log(mealsByCategory);

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
      <Container>
        {categories.map((category) => (
          <DishWrapper label={category.name} data={meals} />
        ))}
      </Container>
    </App>
  );
}

export default Home;
