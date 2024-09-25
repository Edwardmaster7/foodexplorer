import React, { useCallback, useState } from "react";
import {
  Card,
  QuantityControl,
  ButtonContainer,
  Image,
  Name,
  LogicsContainer,
  Description,
} from "./styles";

import { FiPlus, FiMinus } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { api } from "../../services/api";

import Button from "../Button";

function DishCard({ dish, onQuantityChange, onInclude, onFavorite }) {
  // const [viewportWidth, setViewportWidth] = useState();

  // Using useCallback to optimize performance
  const handleIncrement = useCallback(
    (id) => {
      onQuantityChange(id, dish.quantity + 1);
    },
    [dish.quantity, onQuantityChange]
  );

  const handleDecrement = useCallback(
    (id) => {
      onQuantityChange(id, dish.quantity > 1 ? dish.quantity - 1 : 1);
    },
    [dish.quantity, onQuantityChange]
  );

  const handleFavoriteClick = useCallback(() => {
    onFavorite(dish.id);
  }, [dish.id, onFavorite]);

  // function checkScreenSize() {
  //   const width = window.innerWidth;

  //   setViewportWidth(width);
  // }

  // // Call the function initially
  // useCallback(() => {
  //   checkScreenSize();
  // }, []);

  // // Set up an event listener to call the function when the window is resized
  // window.addEventListener("resize", checkScreenSize);

  return (
    <Card key={dish.id}>
      <div id="card-content">
        <Image src={dish.imgURL} alt={dish.name} />
        <div id="favorite" onClick={handleFavoriteClick}>
          {dish.isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
        <Name>
          <h3>{dish.name}</h3>
          <HiChevronRight id="chevron-right" />
        </Name>
        <Description>{dish.description}</Description>
      </div>
      <div>
        <ButtonContainer>
          <span>R$ {dish.price}</span>
          <QuantityControl className="mobile">
            <FiMinus id="buttons" onClick={() => handleDecrement(dish.id)} />
            <p>{dish.quantity < 10 ? `0${dish.quantity}` : dish.quantity}</p>
            <FiPlus id="buttons" onClick={() => handleIncrement(dish.id)} />
          </QuantityControl>
        </ButtonContainer>
        <LogicsContainer>
          <QuantityControl className="desktop">
            <FiMinus id="buttons" onClick={() => handleDecrement(dish.id)} />
            <p>{dish.quantity < 10 ? `0${dish.quantity}` : dish.quantity}</p>
            <FiPlus id="buttons" onClick={() => handleIncrement(dish.id)} />
          </QuantityControl>
          <Button title="Incluir" onClick={onInclude} />
        </LogicsContainer>
      </div>
    </Card>
  );
}

export default React.memo(DishCard);
