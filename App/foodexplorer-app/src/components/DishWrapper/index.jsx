import { Container, Wrapper } from "./styles";

import DishCard from "../DishCard";

import React, { useMemo } from "react";
import { api } from "../../services/api";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function DishWrapper({ label, data, add, setData, ...props }) {
  // Memorize the dish cards
  const dishCards = useMemo(() => {
    return data.map((dish) => {
      const handleQuantityChange = (id, newQuantity) => {
        const updatedDish = (prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
        setData(updatedDish);
      };

      const handleInclude = () => {
        add(dish.id);
      };

      const handleFavorite = (id) => {
        const updatedDish = (prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
          );
        try {
          // api.patch(`/dishes/${id}`, { isFavorite: !dish.isFavorite });
          if (dish.isFavorite) {
            api.delete(`/favourites/${id}`);
            setData(updatedDish);
          } else {
            api.post(`/favourites/${id}`);
            setData(updatedDish);
          }
        } catch (error) {
          console.error(error);
          alert(
            `Erro ao favoritar/desfavoritar o prato. Tente novamente mais tarde.${error.message}`
          );
        }
      };

      return (
        <DishCard
          key={dish.id}
          dish={dish}
          onQuantityChange={handleQuantityChange}
          onInclude={handleInclude}
          onFavorite={handleFavorite}
        />
      );
    });
  });

  // function add(id) {
  //   setItems(prevItems => prevItems.map(item =>
  //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //   ));
  // }

  // function remove(id) {
  //   setItems(prevItems => prevItems.map(item =>
  //     item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
  //   ));
  // }

  return (
    <Container>
      <h1>{label}</h1>
      <div className="pagination">
        <div id="left"><SlArrowLeft /></div>
        <Wrapper>{dishCards}</Wrapper>
        <div id="right"><SlArrowRight /></div>
      </div>
    </Container>
  );
}

export default React.memo(DishWrapper);
