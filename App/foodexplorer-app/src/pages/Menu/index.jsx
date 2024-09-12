import { useEffect, useState } from "react";
import { App, Container, Header, Footer } from "./styles";

import InputField from "../../components/InputField";

import logo from "../../assets/footer_logo.svg";
import close from "../../assets/icons/close.svg";
import search from "../../assets/icons/search.svg";

import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

function Menu() {
  const { signOut, user } = useAuth();

  useEffect(() => {}, []);

  return (
    <App>
      <Header>
        <Link to="/">
          <img src={close} alt="" />
        </Link>
        Menu
      </Header>

      <Container>
        <InputField
          icon={search}
          placeholder="Busque por pratos ou ingredientes"
        />
        <div>
          {user.isAdmin ? <Link to="/" className="option">Novo Prato</Link> : null}
          <Link onClick={signOut} className="option">Sair</Link>
        </div>
      </Container>

      <Footer>
        <img src={logo} alt="" />
        <p>© 2023 - Todos os direitos reservados.</p>
      </Footer>
    </App>
  );
}

export default Menu;
