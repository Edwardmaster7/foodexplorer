import { Container } from "./styles";

import { FiMinus, FiPlus } from "react-icons/fi";

export function QuantityControl({ dish, handleIncrement, handleDecrement }) {
  return (
    <Container>
      <FiMinus id="buttons" onClick={() => handleDecrement(dish.id)} />
      <p>{dish.quantity < 10 ? `0${dish.quantity}` : dish.quantity}</p>
      <FiPlus id="buttons" onClick={() => handleIncrement(dish.id)} />
    </Container>
  );
}

export default QuantityControl;