import React from "react";
import { Container, Content, Form } from "./styles";

import { Link } from "react-router-dom";

import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

function SignIn() {
  return (
    <Container>
      <Logo />
      <Content>
        <Form>
          <InputField
            type="email"
            label="E-mail"
            placeholder="exemplo@mail.com"
          />
          <InputField
            type="password"
            label="Senha"
            placeholder="Insira sua senha"
          />
          <Button title="Entrar" />
        </Form>

        <Link to="#">Criar uma conta</Link>
      </Content>
    </Container>
  );
}

export default SignIn;
