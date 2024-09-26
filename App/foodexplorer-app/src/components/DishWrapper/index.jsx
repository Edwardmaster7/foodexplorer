import { Container, Wrapper } from "./styles";

import DishCard from "../DishCard";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { api } from "../../services/api";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function DishWrapper({ label, data, add, setData, ...props }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; 
  const maxScroll = Math.floor(data.length / itemsPerPage); 
  const wrapperRef = useRef(null);

  // Function to scroll the dishes to the right
  const handleNext = () => {
    if (currentPage < maxScroll) {
      setCurrentPage(currentPage + 1);
      wrapperRef.current.scrollBy({ left: wrapperRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  // Function to scroll the dishes to the left
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      wrapperRef.current.scrollBy({ left: -wrapperRef.current.offsetWidth, behavior: "smooth" });
    }
  };

  // Memorize the dish cards
  const dishCards = useMemo(() => {
    return data.map((dish) => {
      const handleQuantityChange = (id, newQuantity) => {
        const updatedDish = (prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          );
        setData(updatedDish);
      };

      const handleInclude = () => {
        add(dish.id);
      };

      const handleEdit = (dish) => {
        console.log(dish);
      };

      const handleFavorite = (id) => {
        const updatedDish = (prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
          );
        try {
          // api.patch(`/dishes/${id}`, { isFavorite: !dish.isFavorite });
          if (dish.isFavorite) {
            api.delete(`/favourites/${id}`);
            setData(updatedDish);
          } else {
            api.post(`/favourites/${id}`);
            setData(updatedDish);
          }
        } catch (error) {
          console.error(error);
          alert(
            `Erro ao favoritar/desfavoritar o prato. Tente novamente mais tarde.${error.message}`
          );
        }
      };

      return (
        <DishCard
          key={dish.id}
          dish={dish}
          onQuantityChange={handleQuantityChange}
          onInclude={handleInclude}
          onFavorite={handleFavorite}
          onEdit={handleEdit}
          {...props}
        />
      );
    });
  });

  // function add(id) {
  //   setItems(prevItems => prevItems.map(item =>
  //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //   ));
  // }

  // function remove(id) {
  //   setItems(prevItems => prevItems.map(item =>
  //     item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
  //   ));
  // }

  return (
    <Container>
      <h1>{label}</h1>
      <div className="pagination">
        {(currentPage === 0 || data.length <= itemsPerPage) ? null : <div id="left" onClick={handlePrev}><SlArrowLeft /></div>}
        <Wrapper ref={wrapperRef} totalItems={data.length}>{dishCards}</Wrapper>
        {(currentPage >= maxScroll - 1 || data.length <= itemsPerPage) ? null : <div id="right" onClick={handleNext} disabled={currentPage == maxScroll}><SlArrowRight /></div>}
      </div>
    </Container>
  );
}

export default React.memo(DishWrapper);
