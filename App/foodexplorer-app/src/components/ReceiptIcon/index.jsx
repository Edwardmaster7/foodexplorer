import { Container, Circle } from "./styles";

import { Link } from "react-router-dom";

import receipt from "../../assets/icons/receipt.svg";

const ReceiptIcon = ({ to, children }) => {
  return (
    <Link to={to}>
      <Container>
        <div className="wrapper">
          <div className="circle-wrapper">
            <Circle children={children} />
          </div>
        </div>
        <img src={receipt} alt="Orders" />
      </Container>
    </Link>
  );
};

export default ReceiptIcon;
