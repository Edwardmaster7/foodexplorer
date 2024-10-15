import {
  App,
  Container,
  OrderContainer,
  PaymentContainer,
  OrdersWrapper,
  Order,
  Empty,
} from "./styles";

import Header from "../../components/Header";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import PaymentOptions from "../../components/PaymentOptions";

import { BsChevronLeft } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

import dishImg from "../../assets/dish.png";

import { api } from "../../services/api";
import { useState, useEffect, useMemo, useCallback } from "react";

import { useAuth } from "../../hooks/auth";
import { useOrder } from "../../hooks/order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();
  const { state, removeItem, getItemsSum } = useOrder();

  // method to format the price
  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    async function fetchOrders() {
      // setIsLoading(true);
      const storedOrder = await localStorage.getItem("@foodex:order");
      if (storedOrder) {
        const parsedOrder = JSON.parse(storedOrder);
        setOrders(parsedOrder.dishes || []);
      }
      // setIsLoading(false);
    }

    fetchOrders();
  }, []);

  // const preloadImage = (src) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.onload = () => resolve(src);
  //     img.onerror = reject;
  //     img.src = src;
  //   });
  // };

  const getDishesImages = async () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      console.log("Orders is not an array or is empty");
      return;
    }

    try {
      const updatedOrders = await Promise.all(
        orders.map(async (dish) => {
          const dishInfo = await api.get(`/dishes/${dish.id}`);
          const imageUrl = `${api.defaults.baseURL}/files/${dishInfo.data.image}`;
          // await preloadImage(imageUrl);
          const formatedPrice = await formatPrice(dishInfo.data.price);
          return {
            ...dish,
            image: dishInfo.data.image,
            imgURL: imageUrl,
            formatedPrice: formatedPrice,
          };
        })
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error loading images:", error);
      alert(
        `Erro ao carregar imagens.\nPor favor, tente novamente mais tarde.\n${error}`
      );
    }
  };

  useEffect(() => {
    if (orders.length > 0 && !orders.every((meal) => meal.imgURL)) {
      setIsLoading(true);
      getDishesImages().finally(() => setIsLoading(false));
    }
  }, [orders]);

  // Load images for dishes only when necessary
  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedData = await Promise.all(
          orders.map(async (meal) => {
            const image = `${api.defaults.baseURL}/files/${meal.image}`;
            return { ...meal, imgURL: image };
          })
        );
        setOrders(updatedData);
        // sessionStorage.setItem('@foodex:dishes', JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error loading images:", error);
        alert(
          `Erro ao carregar imagens.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    };

    // dishes.every(meal => meal.imgURL) ensures that we only update dishes if not all items already have an imgURL
    if (orders.length > 0 && !orders.every((meal) => meal.imgURL)) {
      loadImages();
    }
  }, [orders]); // ensure that the useEffect only runs when dishes is updated

  const totalPrice = useMemo(
    () => formatPrice(state.total_price),
    [state, formatPrice]
  );

  const handleRemoveOrder = useCallback(
    async (dish) => {
      removeItem(dish);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== dish.id)
      );
    },
    [removeItem]
  );

  // method to update the price format on each dish
  // const updatePriceFormat = async (dish) => {
  //   return { ...dish, price: formatPrice(dish.price) };
  // };

  const memorizedOrders = useMemo(() => {
    return (
      <OrdersWrapper>
        <div>
          {orders.length > 0 ? (
            orders.map((dish) => (
              <Order key={dish.id}>
                <div className="info">
                  <img src={dish.imgURL} alt="Foto do prato" />
                  <div className="content">
                    <div className="title">
                      <h3>
                        {dish.quantity}x {dish.name}
                      </h3>
                      <span id="price">{dish.formatedPrice}</span>
                    </div>
                    <a onClick={() => handleRemoveOrder(dish)}>Excluir</a>
                  </div>
                </div>
              </Order>
            ))
          ) : (
            <Empty>
              <h3>Inclua um prato para fazer um pedido...</h3>
            </Empty>
          )}
          <h3 id="total-price" className="desktop-total-price">
            Total: {totalPrice}
          </h3>
        </div>

        <div id="mobile-total-price">
          <h3 id="total-price">
            Total: {totalPrice}
          </h3>
          <Button
            id="forward-button"
            to="/payment"
            disabled={orders.length === 0}
          >
            Avançar
          </Button>
        </div>
      </OrdersWrapper>
    );
  }, [orders, handleRemoveOrder, totalPrice]);

  return (
    <>
      <Header />
      <App>
        <BackButton id="button-link" to="/" />
        <Container>
          <OrderContainer>
            <h1>Meu Pedido</h1>
            {memorizedOrders}
          </OrderContainer>
          <PaymentContainer>
            <h1>Pagamento</h1>
            <div>
              <PaymentOptions />
              {/* <input type="text" placeholder="Cupom de desconto" />
              <Button>Aplicar</Button> */}
            </div>
          </PaymentContainer>
        </Container>
      </App>
    </>
  );
}

export default Orders;
