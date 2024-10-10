import {
  App,
  Container,
  FavouritesWrapper,
  Favourite,
  FavouriteCount,
} from "./styles";

import Header from "../../components/Header";
import BackButton from "../../components/BackButton";

import { BsChevronLeft } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

import dishImg from "../../assets/dish.png";

import { api } from "../../services/api";
import { useState, useEffect, useMemo } from "react";

import { useAuth } from "../../hooks/auth";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [categories, setCategories] = useState([]);

  const { user } = useAuth();

  const handleRemoveFavourite = async (dish_id) => {
    try {
      await api.delete(`/favourites/${dish_id}`);
      // alert("Prato removido dos favoritos!");
      window.location.reload();
    } catch (error) {
      alert("Erro ao remover o prato dos favoritos.");
    }
  };

  useEffect(() => {
    async function fetchFavourites() {
      const response = await api.get("/favourites");
      setFavourites(response.data);
    }

    fetchFavourites();
  }, []);

  // Load images for dishes only when necessary
  useEffect(() => {
    const loadImages = async () => {
      try {
        const updatedData = await Promise.all(
          favourites.map(async (meal) => {
            const image = `${api.defaults.baseURL}/files/${meal.image}`;
            return { ...meal, imgURL: image };
          })
        );
        setFavourites(updatedData);
        // sessionStorage.setItem('@foodex:dishes', JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error loading images:", error);
        alert(
          `Erro ao carregar imagens.\nPor favor, tente novamente mais tarde.\n${error}`
        );
      }
    };

    // dishes.every(meal => meal.imgURL) ensures that we only update dishes if not all items already have an imgURL
    if (favourites.length > 0 && !favourites.every((meal) => meal.imgURL)) {
      loadImages();
    }
  }, [favourites]); // ensure that the useEffect only runs when dishes is updated

  // Extract the different values of categories from the favorites state
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(favourites.map((meal) => meal.category)),
    ];
    setCategories(uniqueCategories);
  }, [favourites]);

  const memorizedFavourites = useMemo(
    () => (
      <FavouritesWrapper>
        {favourites.map((favourite) => (
          <Favourite key={favourite.id}>
            <div className="info">
              <img src={favourite.imgURL} alt="Foto do prato" />
              <div className="content">
                <h3>{favourite.name}</h3>
                {user.isAdmin ? (
                  <Link id="edit" to={`/dish/edit/${favourite.id}`}>
                    Editar prato
                  </Link>
                ) : (
                  <a onClick={() => handleRemoveFavourite(favourite.id)}>
                    Remover
                  </a>
                )}
              </div>
            </div>
            {user.isAdmin ? (
              <>
                <FavouriteCount>
                  <FaHeart />
                  {favourite.favouriteCount}
                </FavouriteCount>
              </>
            ) : null}
          </Favourite>
        ))}
      </FavouritesWrapper>
    ),
    [favourites]
  );

  const memorizedFavouritesForAdmin = useMemo(() => {
    return (
      <FavouritesWrapper>
        {categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            {favourites
              .filter((favourite) => favourite.category === category)
              //order by favouriteCount
              .sort((a, b) => b.favouriteCount - a.favouriteCount)
              .map((favourite) => (
                <Favourite key={favourite.id}>
                  <div className="info">
                    <img src={favourite.imgURL} alt="Foto do prato" />
                    <div className="content">
                      <h3>{favourite.name}</h3>
                      <Link id="edit" to={`/dish/edit/${favourite.id}`}>
                        Editar prato
                      </Link>
                    </div>
                  </div>
                  <FavouriteCount>
                    <FaHeart />
                    {favourite.favouriteCount}
                  </FavouriteCount>
                </Favourite>
              ))}
          </div>
        ))}
        {/* favourites.map((favourite) => (
          <Favourite key={favourite.id}>
            <div className="info">
              <img src={favourite.imgURL} alt="Foto do prato" />
              <div className="content">
                <h3>{favourite.name}</h3>
                <Link id="edit" to={`/dish/edit/${favourite.id}`}>
                  Editar prato
                </Link>
              </div>
            </div>
            <FavouriteCount>
              <FaHeart />
              {favourite.favouriteCount}
            </FavouriteCount>
          </Favourite>
        ))} */}
      </FavouritesWrapper>
    );
  }, [favourites]);

  return (
    <>
      <Header />
      <App>
        <BackButton id="button-link" to="/" />
        <Container>
          <h1>{user.isAdmin ? "Favoritados" : "Meus Favoritos"}</h1>
          {user.isAdmin ? memorizedFavouritesForAdmin : memorizedFavourites}
        </Container>
      </App>
    </>
  );
}

export default Favourites;
