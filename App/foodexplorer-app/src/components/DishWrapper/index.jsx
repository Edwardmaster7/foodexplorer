import { Container, Wrapper, Card, ButtonContainer } from "./styles";
import { FiPlus, FiMinus } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";

import Button from "../Button";

export default function DishWrapper({ label, data, add, remove, ...props }) {
  return (
    <Container>
      <h1>{label}</h1>
      <Wrapper>
        {data.map((item) => (
          <Card key={item.id}>
            <div id="card-content">
              <img src={item.photo} alt={item.name} />
              <div id="name">
                <h3>{item.name}</h3>
                <HiChevronRight id="chevron-right" />
              </div>
            </div>
            <div>
              <ButtonContainer>
                <span>R$ {item.price}</span>
                <div id="quantity">
                  <FiMinus id="buttons" onClick={() => remove(item.id)} />
                  <p>
                    {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                  </p>
                  <FiPlus id="buttons" onClick={() => add(item)} />
                </div>
              </ButtonContainer>
              <Button title="Incluir" />
            </div>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
}
