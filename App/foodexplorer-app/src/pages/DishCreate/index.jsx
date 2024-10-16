import {
  App,
  Container,
  Form,
  SelectWrapper,
  Select,
  FileInputWrapper,
  FileInput,
  FileInputLabel,
  FieldsetOne,
  FieldsetTwo,
  ButtonContainer,
} from "./styles";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Header from "../../components/Header";
import IngredientsSelector from "../../components/IngredientsSelector";
import BackButton from "../../components/BackButton";

import { BsChevronLeft } from "react-icons/bs";
import { PiUploadSimple } from "react-icons/pi";
import { IoChevronDown, IoClose } from "react-icons/io5";

import useInputMask from "../../hooks/inputMask";

import { Link } from "react-router-dom";

import { api } from "../../services/api";

function DishCreate() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredientNames, setSelectedIngredientNames] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const priceInputRef = useInputMask({
    alias: 'numeric',
    groupSeparator: '.',
    radixPoint: ',',
    autoGroup: true,
    digits: 2,
    digitsOptional: false,
    prefix: 'R$ ',
    placeholder: '0',
    oncomplete: function(event) {
      const numericValue = event.target.inputmask.unmaskedvalue();
      setValue('price', parseFloat(numericValue.replace(',', '.')));
    }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      // Set the file in the form
      setValue("img", file, {
        shouldValidate: true,
        shouldDirty: true, // This will mark the field as dirty
      });
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
      setImageFile(file);
      // Log immediately after setting the value
      // console.log("Immediately after setValue:");
      // console.log("Current img form value:", watch("img"));
      // console.log("Is form dirty?", formState.isDirty);
      // console.log("Dirty fields:", formState.dirtyFields);

      // Use setTimeout to log again after a short delay
      // setTimeout(() => {
      //   console.log("After short delay:");
      //   console.log("Current img form value:", watch("img"));
      //   console.log("Is form dirty?", formState.isDirty);
      //   console.log("Dirty fields:", formState.dirtyFields);
      // }, 100);

      // setImageFile(file);
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setImagePreview(reader.result);
      // };
      // reader.readAsDataURL(file);
    }
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

  const onSubmit = async (formData) => {
    const createIngredients = async (ingredients) => {
      const { data } = await api.post("/ingredients", { names: ingredients });
      // console.log(data);
      return data.id;
    };

    try {
      const ingredientIds = await Promise.all(
        selectedIngredientNames.map(async (name) => {
          const ingredient = ingredients.find((ing) => ing.name === name);
          if (ingredient) {
            console.log(
              `Found existing ingredient: ${name} with ID: ${ingredient.id}`
            );
            return ingredient.id;
          } else {
            console.log(`Creating new ingredient: ${name}`);
            const newIngredientIds = await createIngredients([name]);
            console.log(`Created ingredient ID: ${newIngredientIds[0]}`);
            return newIngredientIds[0]; // Assuming createIngredients returns an array of IDs
          }
        })
      );

      const form = {
        ...formData,
        price: parseFloat(formData.price.replace('R$ ', '').replace('.', '').replace(',', '.')),
        ingredients_id: ingredientIds,
      };

      // First, create the dish without the image
      const { data } = await api.post("/dishes", form);
      const id = data.id;
      console.log(id);

      // console.log(imagePreview);

      // If an image is provided, handle the image upload separately
      if (imagePreview) {
        const formDataWithImage = new FormData();
        formDataWithImage.append("img", imageFile);

        await api.patch(`/dishes/img/${id}`, formDataWithImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      // Handle successful submission (e.g., redirect or show a success message)
      console.log("Dish created successfully");
      window.location.href = `/dish/${id}`;
    } catch (error) {
      // Handle error (e.g., show an error message)
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Error creating dish:", error);
    }
  };

  return (
    <>
      <Header />
      <App>
        <BackButton id="button-link" />
        <h1>Novo prato</h1>
        <Form id="create-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldsetOne>
            <Container>
              <label htmlFor="img">Imagem do prato</label>
              <FileInputWrapper>
                <FileInput
                  type="file"
                  id="img"
                  accept="image/*"
                  // {...register("img", { required: "Imagem é obrigatória" })}
                  // value={imageFile}
                  onChange={handleFileChange}
                />
                <FileInputLabel
                  htmlFor="img"
                  className={`input-img ${errors.image ? "error" : ""}`}
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
                {...register("name", {
                  required: "Nome é um campo obrigatório",
                })}
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
                  {...register("category_id", {
                    required: "Categoria é um campo obrigatório",
                  })}
                >
                  <option value="" disabled defaultValue selected>
                    Selecione uma categoria
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <IoChevronDown />
              </SelectWrapper>
            </Container>
          </FieldsetOne>
          <FieldsetTwo>
            <Container>
              <label htmlFor="ingredients">Ingredientes</label>
              <IngredientsSelector
                className="input-ingredient"
                ingredients={ingredients}
                selectedIngredients={selectedIngredientNames}
                setSelectedIngredients={setSelectedIngredientNames}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </Container>
            <Container>
              <label htmlFor="price">Preço</label>
              <input
                id="price"
                type="text"
                placeholder="R$ 0,00"
                className={`input ${errors.price ? "error" : ""}`}
                ref={priceInputRef}
                {...register("price", {
                  required: "Preço é um campo obrigatório",
                  validate: (value) => parseFloat(value.replace(',', '.')) > 0 || "O preço deve ser maior que zero"
                })}
              />
              {errors.price && (
                <span className="error-message">{errors.price.message}</span>
              )}
            </Container>
          </FieldsetTwo>
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
                required: "Descrição é um campo obrigatório",
              })}
            />
            {errors.description && (
              <span id="description-error" className="error-message">
                {errors.description.message}
              </span>
            )}
          </Container>
        </Form>
        <ButtonContainer>
          <button
            id="submit-btn"
            type="submit"
            form="create-form"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Salvando..." : "Criar prato"}
          </button>
        </ButtonContainer>
      </App>
    </>
  );
}

export default DishCreate;
