import { Container } from "./styles";

import { FiMinus, FiPlus } from "react-icons/fi";

export function QuantityControl({ quantity, id, handleIncrement, handleDecrement }) {
  return (
    <Container>
      <FiMinus id="buttons" onClick={() => handleDecrement(id)} />
      <p>{quantity < 10 ? `0${quantity}` : quantity}</p>
      <FiPlus id="buttons" onClick={() => handleIncrement(id)} />
    </Container>
  );
}

export default QuantityControl;