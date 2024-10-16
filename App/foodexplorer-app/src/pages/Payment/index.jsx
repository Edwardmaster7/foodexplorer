import { App, PaymentContainer } from "./styles";

import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import PaymentOptions from "../../components/PaymentOptions";

export default function Payment() {
  return (
    <>
      <Header />
      <App>
        <PaymentContainer>
          <BackButton />
          <PaymentOptions />
        </PaymentContainer>
      </App>
    </>
  );
}
