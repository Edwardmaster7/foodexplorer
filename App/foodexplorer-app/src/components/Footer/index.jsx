import { Container } from  "./styles";

import logo from "../../assets/footer_logo.svg";

const Footer = () => {
  return (
    <Container>
        <img src={logo} alt="" />
        <p>© 2023 - Todos os direitos reservados.</p>
      </Container>
  );
};

export default Footer;