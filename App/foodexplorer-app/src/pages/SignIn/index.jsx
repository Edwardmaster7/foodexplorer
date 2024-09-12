import React from "react";
import { Container, Content, Title, Form, InputWrapper } from "./styles";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const { signIn } = useAuth();

  function handleSubmit() {
    if (!email) {
      setIsEmailValid(false);
      return alert("Preencha todos os campos!");
    } else {
      setIsEmailValid(true);
    }

    if (!password) {
      setIsPasswordValid(false);
      return alert("Preencha todos os campos!");
    } else {
      setIsPasswordValid(true);
    }

    signIn({ email, password });
  }

  return (
    <Container>
      <Logo id="logo"/>
      <Content>
        <Title>
          <h1>Bem-vindo!</h1>
          <h2>Faça login para prosseguir</h2>
        </Title>

        <Form>
          <InputWrapper is_valid={isEmailValid}>
            <InputField
              type="email"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@mail.com"
            />
          </InputWrapper>
          <InputWrapper is_valid={isPasswordValid}>
            <InputField
              type="password"
              label="Senha"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Insira sua senha"
            />
          </InputWrapper>

          <Button title="Entrar" onClick={handleSubmit} />
        </Form>

        <Link id="create-account-link" to="/signup">
          Criar uma conta
        </Link>
      </Content>
    </Container>
  );
}

export default SignIn;
