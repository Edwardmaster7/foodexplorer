import {
  App,
  BackButton,
  Container,
  ButtonContainer,
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

import { useAuth } from "../../hooks/auth";

function DishEdit() {
  const [imagePreview, setImagePreview] = useState(null);
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
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        register("image");
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
        ingredient.toLowerCase().startsWith(event.target.value.toLowerCase())
      )
    );
  };

  // fetch ingredients from api and store them in the state
  useEffect(() => {
    const fetchIngredients = async () => {
      const { data } = await api.get("/ingredients");
      // console.log(data);

      // filter the ingredients name only from data and store them in the state
      const ingredientNames = data.map((ingredient) => ingredient.name);
      setIngredients(ingredientNames);
    };
    fetchIngredients();
  }, []);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((i) => i !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
    // You can send the data to an API here
  };

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
        <h1>Editar prato</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <label htmlFor="image">Imagem do prato</label>
            <FileInputWrapper>
              <FileInput
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                // {...register("image")}
              />
              <FileInputLabel htmlFor="image" className="input">
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
              className="input"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </Container>
          <Container>
            <label htmlFor="category">Categoria</label>
            <SelectWrapper>
              <Select
                name="category"
                className="input"
                {...register("category", { required: "Category is required" })}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <IoChevronDown />
            </SelectWrapper>
            {errors.category && <span>{errors.category.message}</span>}
          </Container>
          <Container>
            <label htmlFor="ingredients">Ingredientes</label>
            <IngredientsWrapper className="input">
              <SelectedIngredientsWrapper>
                {selectedIngredients.map((ingredient, ingredientIndex) => (
                  <Ingredient key={ingredientIndex}>
                    <IngredientInput
                      type="text"
                      value={ingredient}
                      placeholder="Ex.: Banana"
                      // {...register(`ingredients.${ingredientIndex}`, { required: "Ingredient is required" })}
                      onChange={(e) =>
                        setSelectedIngredients(
                          selectedIngredients.map((ingredientItem, itemIndex) =>
                            itemIndex === ingredientIndex
                              ? e.target.value
                              : ingredientItem
                          )
                        )
                      }
                    />
                    <IoClose
                      onClick={() =>
                        setSelectedIngredients(
                          selectedIngredients.filter(
                            (_, itemIndex) => itemIndex !== ingredientIndex
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
                      setSelectedIngredients([...selectedIngredients, ""]);
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
                      // ref={filterWrapperRef}
                      placeholder="Busque por ingredientes"
                      onChange={(e) => handleFilterChange(e)}
                      value={filterTerm}
                    />
                  </div>
                  <ResultsWrapper>
                    {filterTerm
                      ? filterResults
                          .filter(
                            (ingredient) =>
                              !selectedIngredients.includes(ingredient)
                          )
                          .map((result, index) => (
                            <CustomOption
                              onClick={() => handleIngredientChange(result)}
                              className="result"
                              key={index}
                              children={result}
                            />
                          ))
                      : ingredients
                          .filter(
                            (ingredient) =>
                              !selectedIngredients.includes(ingredient)
                          )
                          .map((ingredient, index) => (
                            <CustomOption
                              onClick={() => handleIngredientChange(ingredient)}
                              className="result"
                              key={index}
                              children={ingredient}
                            />
                          ))}
                    {/* <CustomOption className="result">
                    Banana
                  </CustomOption>
                  <CustomOption className="result">
                    Banana
                  </CustomOption> */}
                  </ResultsWrapper>
                </FilterWrapper>
              )}
            </IngredientsWrapper>
            {errors.ingredients && <span>{errors.ingredients.message}</span>}
          </Container>
          <Container>
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              type="number"
              placeholder="R$ 00,00"
              className="input"
              // {...register("price", { required: "Price is required" })}
            />
            {/* {errors.price && <span>{errors.price.message}</span>} */}
          </Container>
          <Container>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição\nEx.: Uma salada de folhas verdes e cilantro"
              className="input"
              rows={8}
              cols={50}
              maxLength={150}
              // {...register("description", {
              //   required: "Description is required",
              // })}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </Container>
          <ButtonContainer>
            <Button id="delete-btn">Excluir prato</Button>
            <Button id="submit-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </ButtonContainer>
        </Form>
      </App>
    </>
  );
}

export default DishEdit;
