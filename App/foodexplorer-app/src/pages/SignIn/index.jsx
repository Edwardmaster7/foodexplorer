import React from "react";
import { Container, Content, Form, InputWrapper } from "./styles";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";
// import { useAuth } from "../../hooks/auth";

import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // const { signIn } = useAuth();
  
  function handleSubmit() {
    console.log(email, password)
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


    // try {
    //   signIn({ email, password });
    // } catch (error) {
    //   if (error.response) {
    //     alert(error.response.data.message);
    //   } else {
    //     alert("Não foi possível entrar.");
    //   }
    // }
  }

  return (
    <Container>
      <Logo />
      <Content>
        <Form>
          <InputWrapper isValid={isEmailValid}>
            <InputField
              type="email"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@mail.com"
            />
          </InputWrapper>
          <InputWrapper isValid={isPasswordValid}>
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
