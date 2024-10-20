import {
  App,
  DishImage,
  Container,
  Content,
  ImageContainer,
  IngredientsWrapper,
} from "./styles";

import { useState, useEffect, useMemo } from "react";

import Header from "../../components/Header";
import QuantityControl from "../../components/QuantityControl";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

import receipt from "../../assets/icons/receipt.svg";

import { BsChevronLeft } from "react-icons/bs";

import { useParams, useLocation, Link } from "react-router-dom";

import { api } from "../../services/api";

import { useAuth } from "../../hooks/auth";

import { useOrder } from "../../hooks/order";

function DishDetails() {
  const [dish, setDish] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();
  const { state, addItem, setCustomerID, getItemsSum } = useOrder();

  // Scroll to top of screen when loaded
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

  const id = useParams().id;

  useEffect(() => {
    async function fetchDish() {
      try {
        const response = await api.get(`/dishes/${id}`);
        // console.log(response.data);
        setDish(response.data);
        // loadImages();
      } catch (error) {
        console.error("Error loading dish:", error);
        alert(
          `Erro ao carregar prato.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    }

    fetchDish();
  }, [id]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const image = `${api.defaults.baseURL}/files/${dish.image}`;
        const updatedData = { ...dish, imgURL: image };
        setDish(updatedData);
        // sessionStorage.setItem('@foodex:dishes', JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error loading image:", error);
        alert(
          `Erro ao carregar imagem.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    };

    if (dish.image && !dish.imgURL) {
      loadImages();
    }
  }, [dish]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddItem = () => {
    const item = {
      id: dish.id,
      name: dish.name,
      price: Number(dish.price).toFixed(2),
      quantity: quantity,
      // imgURL: dish.imgURL,
    };

    addItem(item);
    setCustomerID(user.id);
    // console.log(state)
    // console.log(getItemsSum());
  };

  const handleEdit = () => {
    // redirect to edit dish page
    let to = `/dish/edit/${dish.id}`;

    window.location.href = to;
  };

  return (
    <>
      <Header />
      <App>
        <BackButton id="button-link" to="/" />
        <Container>
          <ImageContainer>
            <DishImage src={dish.imgURL} alt="" />
          </ImageContainer>
          <Content>
            <h1>{dish.name}</h1>
            <p>{dish.description}</p>
            <IngredientsWrapper>
              {dish.ingredients &&
                dish.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </IngredientsWrapper>
            <div id="include">
              {user.isAdmin ? null : (
                <QuantityControl
                  id="quantity"
                  quantity={quantity}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
              )}
              <Button
                onClick={user.isAdmin ? handleEdit : handleAddItem}
                className={user.isAdmin ? "font-button-admin-mobile" : null}
              >
                {user.isAdmin ? (
                  "Editar"
                ) : (
                  <>
                    <img src={receipt} alt="" />
                    Incluir ∙ R$ {dish.price}
                  </>
                )}
              </Button>
            </div>
          </Content>
        </Container>
      </App>
    </>
  );
}

export default DishDetails;
