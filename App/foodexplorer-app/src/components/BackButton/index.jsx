import { Container } from "./styles";

import { BsChevronLeft } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

const BackButton = ({ to, id, ...props }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Link to={to} id={id}>
      <Container onClick={to ? null : handleBack} {...props}>
        <BsChevronLeft />
        voltar
      </Container>
    </Link>
  );
};

export default BackButton;
