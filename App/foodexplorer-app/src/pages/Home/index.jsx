import { App, Header, Container, Banner } from "./styles";

import { Link } from "react-router-dom";

import ReceiptIcon from "../../components/ReceiptIcon";
import InputField from "../../components/InputField";
import Logo from "../../components/Logo";

import menuIcon from "../../assets/icons/stack-menu.svg";
import macarons from "../../assets/macarons.png";

function Home() {
  return (
    <App>
      <Header>
        <Link to="/menu">
          <img id="menu" src={menuIcon} alt="Menu" />
        </Link>
        <Logo id="logo" />
        <ReceiptIcon to="/menu" children={0} />
      </Header>
      <Banner>
        <div id="wrapper">
          <img src={macarons} alt="Ilustration of macarons and fruits" />
        </div>
        <div id="rectangle">
          <div></div>
          <div id="banner-text">
            <h1>Sabores inigualáveis</h1>
            <p>
              Sinta o cuidado do preparo com<br />
              ingredientes selecionados.
            </p>
          </div>
        </div>
      </Banner>
      <Container></Container>
    </App>
  );
}

export default Home;
