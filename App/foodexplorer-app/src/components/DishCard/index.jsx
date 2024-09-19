import React, { useCallback } from "react";
import { Card, QuantityControl, ButtonContainer } from "./styles";

import { FiPlus, FiMinus } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";

import Button from "../Button";

function DishCard({ dish, onQuantityChange, onInclude }) {

    // Using useCallback to optimize performance
    const handleIncrement = useCallback((id) => {
        onQuantityChange(id, dish.quantity + 1);
    }, [dish.quantity, onQuantityChange]);

    const handleDecrement = useCallback((id) => {
        onQuantityChange(id, dish.quantity > 1 ? (dish.quantity - 1) : 1);
    }, [dish.quantity, onQuantityChange]);


    return (
        <Card key={dish.id}>
            <div id="card-content">
              <img src={dish.imgURL} alt={dish.name} />
              <div id="name">
                <h3>{dish.name}</h3>
                <HiChevronRight id="chevron-right" />
              </div>
            </div>
            <div>
              <ButtonContainer>
                <span>R$ {dish.price}</span>
                <QuantityControl>
                  <FiMinus id="buttons" onClick={() => handleDecrement(dish.id)} />
                  <p>
                    {dish.quantity < 10 ? `0${dish.quantity}` : dish.quantity}
                  </p>
                  <FiPlus id="buttons" onClick={() => handleIncrement(dish.id)} />
                </QuantityControl>
              </ButtonContainer>
              <Button title="Incluir" onClick={onInclude}/>
            </div>
          </Card>
    );
}

export default React.memo(DishCard);