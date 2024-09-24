import { Container, Circle } from "./styles";

import { Link } from "react-router-dom";

import receipt from "../../assets/icons/receipt.svg";

const ReceiptIcon = ({ to, children, id, ...props }) => {
  return (
    <Link to={to} id={id}>
      <Container {...props}>
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
