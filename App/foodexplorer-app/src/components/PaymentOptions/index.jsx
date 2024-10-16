import {
  Container,
  PaymentOption,
  PaymentOptionText,
  PaymentOptionsWrapper,
  PaymentInfo,
  Input,
} from "./styles";

import { useState } from "react";

import Button from "../../components/Button";

import pix from "../../assets/qrcode.svg";
import receipt from "../../assets/icons/receipt.svg";
import creditCard from "../../assets/icons/credit-card.svg";
import pixIcon from "../../assets/icons/pix.svg";

import { useForm } from "react-hook-form";

import { useOrder } from "../../hooks/order";

const PaymentOptions = ({ orders, onSubmit }) => {
  const [paymentOption, setPaymentOption] = useState("pix");
  const { state } = useOrder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm({
    defaultValues: {
      cardNumber: "",
      expiration: "",
      cvc: "",
    },
  });

  const handlePaymentOption = (paymentOption) => {
    setPaymentOption(paymentOption);
  };


  return (
    <Container>
      <PaymentOptionsWrapper>
        <PaymentOption
          onClick={() => handlePaymentOption("pix")}
          className={paymentOption === "pix" ? "selected" : ""}
        >
          <PaymentOptionText>
            <img src={pixIcon} alt="pix" />
            <p>PIX</p>
          </PaymentOptionText>
        </PaymentOption>
        <PaymentOption
          onClick={() => handlePaymentOption("credit")}
          className={paymentOption === "credit" ? "selected" : ""}
        >
          <PaymentOptionText>
            <img src={creditCard} alt="credit-card" />
            <p>Cartão de Crédito</p>
          </PaymentOptionText>
        </PaymentOption>
      </PaymentOptionsWrapper>
      <PaymentInfo>
        {paymentOption === "pix" && (
          <div className="pix">
            <img src={pix} alt="pix" />
          </div>
        )}
        {paymentOption === "credit" && (
          <form onSubmit={handleSubmit(onSubmit)} className="credit">
            <Input>
              <label htmlFor="cardNumber">Número do Cartão</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                disabled={!state.dishes.length}
                pattern="[0-9]{16}"
                {...register("cardNumber", {
                  required: "Número do cartão é um campo obrigatório",
                })}
              />
            </Input>
            <div className="credit-inputs">
              <Input>
                <label htmlFor="expiration">Validade</label>
                <input
                  type="text"
                  id="expiration"
                  placeholder="MM/AA"
                  pattern="[0-9]{2}/[0-9]{2}"
                  disabled={!state.dishes.length}
                  {...register("expiration", {
                    required: "Validade é um campo obrigatório",
                  })}
                />
              </Input>
              <Input>
                <label htmlFor="CVC">CVC</label>
                <input
                  type="text"
                  id="CVC"
                  placeholder="000"
                  pattern="[0-9]{3}"
                  disabled={!state.dishes.  length}
                  {...register("cvc", {
                    required: "CVC é um campo obrigatório",
                  })}
                />
              </Input>
            </div>
            <Button type="submit" disabled={isSubmitting || !isValid || !state.dishes.length}>
              <img src={receipt} alt="receipt" />
              Finalizar Pagamento
            </Button>
            {errors.cardNumber && (
              <span className="error-message">{errors.cardNumber.message}</span>
            )}
          </form>
        )}
      </PaymentInfo>
    </Container>
  );
};

export default PaymentOptions;
