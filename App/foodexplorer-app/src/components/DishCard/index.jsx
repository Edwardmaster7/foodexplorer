import React, { useCallback, useState } from "react";
import {
  Card,
  ButtonContainer,
  Image,
  Name,
  Price,
  LogicsContainer,
  Description,
} from "./styles";

import { Link } from "react-router-dom";

import { FiPlus, FiMinus } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { PiPencilSimpleBold } from "react-icons/pi";

import { api } from "../../services/api";

import Button from "../Button";
import QuantityControl from "../QuantityControl";

function DishCard({
  dish,
  onQuantityChange,
  onInclude,
  onEdit,
  onFavorite,
  isAdmin,
}) {
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

  const handleEditClick = useCallback(() => {
    onEdit(dish);
  }, [dish, onEdit]);

  const handleIncludeClick = useCallback(() => {
    onInclude(dish);
  }, [dish, onInclude]);

  return (
    <Card key={dish.id}>
      <div id="card-content">
        <Image src={dish.imgURL} alt={dish.name} />
        {isAdmin ? (
          <div id="edit" onClick={handleEditClick}>
            <PiPencilSimpleBold className="icon" />
          </div>
        ) : (
          <div id="favorite" onClick={handleFavoriteClick}>
            {dish.isFavorite ? (
              <FaHeart className="icon" />
            ) : (
              <FaRegHeart className="icon" />
            )}
          </div>
        )}
        <Link to={`/dish/${dish.id}`}>
          <Name>
            <h3>{dish.name}</h3>
            <HiChevronRight id="chevron-right" />
          </Name>
        </Link>
        <Description>{dish.description}</Description>
      </div>
      <div id="card-logic">
        <Price>R$ {dish.price}</Price>
        {!isAdmin ? (
          <LogicsContainer>
            <QuantityControl
              quantity={dish.quantity}
              id={dish.id}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
            />
            <Button
              id="desktop-include-button"
              title="Incluir"
              onClick={handleIncludeClick}
            />
          </LogicsContainer>
        ) : (
          <div />
        )}
      </div>
      {!isAdmin ? (
        <Button
          id="mobile-include-button"
          title="Incluir"
          onClick={handleIncludeClick}
        />
      ) : (
        <div />
      )}
    </Card>
  );
}

export default React.memo(DishCard);
