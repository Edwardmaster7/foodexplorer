import { Container, Wrapper } from "./styles";

import DishCard from "../DishCard";

import React, { useMemo } from "react";
import { api } from "../../services/api";

function DishWrapper({ label, data, add, setData, ...props }) {

    // Memorize the dish cards
    const dishCards = useMemo(() => {
      return data.map(dish => {
        const handleQuantityChange = (id, newQuantity) => {
          const updatedDish = prevData => prevData.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
          setData(updatedDish);
        };

        const handleInclude = () => {
          add(dish.id);
        };

        return (
          <DishCard
            key={dish.id}
            dish={dish}
            onQuantityChange={handleQuantityChange}
            onInclude={handleInclude}
          />
        );
      })
    })
  
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
      <Wrapper>
        {dishCards}
      </Wrapper>
    </Container>
  );
}

export default React.memo(DishWrapper);

