import React from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";

function Button({ title, to, ...props }) {
  return (
    <Link to={to}>
      <Container {...props}>
            {title}
      </Container>
    </Link>
  );
}

export default Button;
