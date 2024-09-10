import React from "react";
import { Container, Content, Form, InputWrapper } from "./styles";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useState } from "react";

import InputField from "../../components/InputField";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit() {
    if(!name) {
      setIsNameValid(false);
      return alert("Por favor, preencha o nome!");
    } else {
      setIsNameValid(true);
    }
    if(!email) {
      setIsEmailValid(false);
      return alert("Por favor, preencha o email!");
    } else {
      setIsEmailValid(true);
    }
    if(!password) {
      setIsPasswordValid(false);
      return alert("Por favor, preencha a senha!");
    } else {
      setIsPasswordValid(true);
    }
    // console.log(isNameValid, isEmailValid, isPasswordValid);
    setLoading(true);

    const data = { name, email, password };

    console.log(data);

    api
      .post("/users", data)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          return alert(
            `Ocorreu um erro no cadastro:\n${error.response.data.message}`
          );
        } else {
          alert("Ocorreu um erro ao cadastrar o usuário...");
        }
        console.error(error);
      });
  }
  return (
    <Container>
      <Logo />
      <Content>
        <Form>
          <InputWrapper isValid={isNameValid}>
            <InputField
              type="text"
              label="Seu nome"
              
              onChange={(e) => setName(e.target.value)}
              placeholder="Silvia Roberts"
            />
          </InputWrapper>
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
              placeholder="Mínimo de 6 caracteres"
            />
          </InputWrapper>

          <Button title="Criar conta" onClick={handleSubmit} />
        </Form>

        <Link id="login-link" to="/">
          Já tenho uma conta
        </Link>
      </Content>
    </Container>
  );
}

export default SignUp;
