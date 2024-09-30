import React from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";

function Button({ title, children, to, id, ...props }) {
  return (
    <Link to={to} id={id}>
      <Container {...props}>
            {title ? title : children}
      </Container>
    </Link>
  );
}

export default Button;
