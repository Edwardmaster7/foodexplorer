import {
  App,
  BackButton,
  Container,
  Form,
  SelectWrapper,
  Select,
  FileInputWrapper,
  FileInput,
  FileInputLabel,
  SelectedIngredientsWrapper,
  IngredientsWrapper,
  Ingredient,
  IngredientInput,
  FilterWrapper,
  ResultsWrapper,
  CustomOption,
} from "./styles";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Header from "../../components/Header";
import QuantityControl from "../../components/QuantityControl";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

import filterIcon from "../../assets/icons/search.svg";

import { BsChevronLeft } from "react-icons/bs";
import { PiUploadSimple } from "react-icons/pi";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { HiOutlinePlusSm } from "react-icons/hi";

import { useParams, useLocation, Link } from "react-router-dom";

import { api } from "../../services/api";

function DishCreate() {
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [addingIngredient, setAddingIngredient] = useState(false);
  // const [addNewIngredient, setAddNewIngredient] = useState(false);
  const [addExistentIngredient, setExistentIngredient] = useState(true);

  const [filterTerm, setFilterTerm] = useState("");
  const [filterResults, setFilterResults] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddIngredientClick = () => {
    setAddingIngredient(true);
    // setAddNewIngredient(true);
    setExistentIngredient(false);
  };

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
    setFilterResults(
      ingredients.filter((ingredient) =>
        ingredient.name
          .toLowerCase()
          .startsWith(event.target.value.toLowerCase())
      )
    );
  };

  // fetch categories form api and store them
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get("/categories");
      // console.log(data);

      // filter the categories name only from data and store them in the state
      // const categoryNames = data.map((category) => category.name);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // fetch ingredients from api and store them in the state
  useEffect(() => {
    const fetchIngredients = async () => {
      const { data } = await api.get("/ingredients");
      // console.log(data);

      // store the ingredients as objects in the state
      setIngredients(data);
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.some((i) => i.id === ingredient.id)
        ? prevSelected.filter((i) => i.id !== ingredient.id)
        : [...prevSelected, ingredient]
    );
  };

  const onSubmit = async (formData) => {
    try {
      const data = {
        ...formData,
        ingredients_id: selectedIngredients.map((ingredient) => ingredient.id),
      };
      console.log(data);

      // If you need to handle the image file separately
      // if (formData.image && formData.image[0]) {
      //   const formDataWithImage = new FormData();

      //   await api.post("/dishes", formDataWithImage, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      // } else {
      //   await api.post("/dishes", data);
      // }

      const dishId = await api.post("/dishes", data);

      // If you want to handle the image file separately
      await api.patch(`/dishes/img/${dishId}`, data.img[0], {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle successful submission (e.g., redirect or show a success message)
      console.log("Dish created successfully");

      

      // Handle successful submission (e.g., redirect or show a success message)
      console.log("Dish created successfully");
    } catch (error) {
      // Handle error (e.g., show an error message)
      alert(error.response.data.message);
      console.error("Error creating dish:", error);
    }
  };


  // Create a memoized version of the ResultsWrapper component,
  // only re-rendering when the filterResults array changes
  const memorizedResultsWrapper = useMemo(() => {
    return (
      <ResultsWrapper>
        {filterTerm
          ? filterResults
              .filter(
                (ingredient) =>
                  !selectedIngredients.some(
                    (selected) =>
                      selected.name.toLowerCase() ===
                      ingredient.name.toLowerCase()
                  )
              )
              .map((result) => (
                <CustomOption
                  onClick={() => handleIngredientChange(result)}
                  className="result"
                  key={result.id}
                  children={result.name}
                />
              ))
          : ingredients
              .filter(
                (ingredient) =>
                  !selectedIngredients.some(
                    (selected) =>
                      selected.name.toLowerCase() ===
                      ingredient.name.toLowerCase()
                  )
              )
              .map((ingredient) => (
                <CustomOption
                  onClick={() => handleIngredientChange(ingredient)}
                  className="result"
                  key={ingredient.id}
                  children={ingredient.name}
                />
              ))}
      </ResultsWrapper>
    );
  }, [filterResults, ingredients, selectedIngredients]);

  return (
    <>
      <Header />
      <App>
        <div id="button-link">
          <Link to="/">
            <BackButton>
              <BsChevronLeft />
              voltar
            </BackButton>
          </Link>
        </div>
        <h1>Novo prato</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <label htmlFor="img">Imagem do prato</label>
            <FileInputWrapper>
              <FileInput
                type="file"
                id="img"
                accept="image/*"
                {...register("img", { required: "Image is required" })}
                onChange={handleFileChange}
              />
              <FileInputLabel
                htmlFor="image"
                className={`input ${errors.image ? "error" : ""}`}
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                    <PiUploadSimple />
                    <p>Selecionar outra?</p>
                  </>
                ) : (
                  <>
                    <PiUploadSimple />
                    <p>Selecione imagem</p>
                  </>
                )}
              </FileInputLabel>
            </FileInputWrapper>
          </Container>
          <Container>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              placeholder="Ex.: Salada Ceasar"
              className={`input ${errors.name ? "error" : ""}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </Container>
          <Container>
            <label htmlFor="category_id">Categoria</label>
            <SelectWrapper>
              <Select
                name="category_id"
                className={`input ${errors.category ? "error" : ""}`}
                {...register("category_id")}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <IoChevronDown />
            </SelectWrapper>
          </Container>
          <Container>
            <label htmlFor="ingredients">Ingredientes</label>
            <IngredientsWrapper
              className={`input ${errors.ingredients ? "error" : ""}`}
              // {...register("ingredients", {
              //   value: selectedIngredients.map(ingredient => ingredient.name),
              //   required: "At least one ingredient is required",
              // })}
            >
              <SelectedIngredientsWrapper>
                {selectedIngredients.map((ingredient) => (
                  <Ingredient key={ingredient.id}>
                    <IngredientInput
                      type="text"
                      value={ingredient.name}
                      placeholder="Ex.: Banana"
                      onChange={(e) =>
                        setSelectedIngredients(
                          selectedIngredients.map((selIngredient) =>
                            selIngredient.id === ingredient.id
                              ? { ...selIngredient, name: e.target.value }
                              : selIngredient
                          )
                        )
                      }
                      
                    />
                    <IoClose
                      onClick={() =>
                        setSelectedIngredients(
                          selectedIngredients.filter(
                            (selIngredient) =>
                              selIngredient.id !== ingredient.id
                          )
                        )
                      }
                    />
                  </Ingredient>
                ))}
                {addExistentIngredient ? (
                  <>
                    <button
                      id="add-ingredient"
                      type="button"
                      className="hidden"
                      onClick={handleAddIngredientClick}
                    >
                      Adicionar
                      <HiOutlinePlusSm />
                    </button>
                  </>
                ) : (
                  <button
                    id="add-new-ingredient"
                    type="button"
                    onClick={() => {
                      setSelectedIngredients([
                        ...selectedIngredients,
                        { id: Date.now(), name: "" },
                      ]);
                    }}
                  >
                    Novo
                    <HiOutlinePlusSm />
                  </button>
                )}
              </SelectedIngredientsWrapper>
              {addingIngredient && (
                <FilterWrapper>
                  <div id="filter-input-wrapper">
                    <img src={filterIcon} alt="" />
                    <InputField
                      id="filter-input"
                      placeholder="Busque por ingredientes"
                      onChange={(e) => handleFilterChange(e)}
                      value={filterTerm}
                    />
                  </div>
                  {memorizedResultsWrapper}
                </FilterWrapper>
              )}
              {errors.ingredients && (
                <span className="error-message">
                  {errors.ingredients.message}
                </span>
              )}
            </IngredientsWrapper>
          </Container>
          <Container>
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              type="number"
              placeholder="R$ 00,00"
              className={`input ${errors.price ? "error" : ""}`}
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <span className="error-message">{errors.price.message}</span>
            )}
          </Container>
          <Container>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição."
              className={`input ${errors.description ? "error" : ""}`}
              rows={8}
              cols={50}
              maxLength={150}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </Container>
          <button id="submit-btn" type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </button>
        </Form>
      </App>
    </>
  );
}

export default DishCreate;
