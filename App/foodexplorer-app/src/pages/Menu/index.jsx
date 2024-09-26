import { useEffect, useState } from "react";
import { App, Container, Header, SearchWrapper } from "./styles";

import InputField from "../../components/InputField";
import Footer from "../../components/Footer";
import search from "../../assets/icons/search.svg";

import close from "../../assets/icons/close.svg";

import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

function Menu() {
  const { signOut, user } = useAuth();

  return (
    <App>
      <Header>
        <Link id="close" to="/">
          <img src={close} alt="close menu"/>
        </Link>
        Menu
      </Header>

      <Container>
        <SearchWrapper>
        <InputField
          icon={search}
          placeholder="Busque por pratos ou ingredientes"
        />
        
        </SearchWrapper>
        <div>
          {user.isAdmin ? <Link to="/" className="option">Novo Prato</Link> : null}
          <Link to="/" onClick={signOut} className="option">Sair</Link>
        </div>
      </Container>
    </App>
  );
}

export default Menu;
