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
} from "./styles";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Header from "../../components/Header";
import QuantityControl from "../../components/QuantityControl";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import IngredientsSelector from "../../components/IngredientsSelector";

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
  const [imageFile, setImageFile] = useState(null);

  const { id } = useParams();
  const [dish, setDish] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [actualIngredients, setActualIngredients] = useState([]);

  const [addingIngredient, setAddingIngredient] = useState(false);
  const [addExistentIngredient, setExistentIngredient] = useState(true);

  const [filterTerm, setFilterTerm] = useState("");
  const [filterResults, setFilterResults] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setValue,
    watch,
    formState,
  } = useForm({ defaultValues: { ingredients: selectedIngredients } });

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

  const handleAddIngredientClick = () => {
    setAddingIngredient(true);
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

  // fetch dish data from the api endpoint
  useEffect(() => {
    const fetchDish = async () => {
      const { data } = await api.get(`/dishes/${id}`);
      setDish(data);
      reset({
        img: null,
        name: "",
        category_id: "",
        price: "",
        description: "",
        ingredients: [],
      });
    };

    fetchDish();
  }, [id, reset]);

  // fetch image from the api endpoint
  useEffect(() => {
    const fetchImage = async () => {
      // const { data } = await api.get(
      //   `${api.defaults.baseURL}/files/${dish.image}`
      // );
      setImagePreview(`${api.defaults.baseURL}/files/${dish.image}`);
    };

    if (dish.image && dish.image !== undefined) {
      fetchImage();
    }
  }, [dish, dish.image]);

  // fetch categories form api and store them
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get("/categories");
      // console.log(data);

      // filter the categories name only from data and store them in the state
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
  }, [dish, id]);

  // merge the dish ingredients's id's and names into the selectedIngredients's state
  useEffect(() => {
    setSelectedIngredients(
      ingredients.filter((ingredient) =>
        dish.ingredients.includes(ingredient.name)
      )
    );
    setActualIngredients(
      ingredients.filter((ingredient) =>
        dish.ingredients.includes(ingredient.name)
      )
    );
  }, [ingredients]);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((i) => i !== ingredient)
        : [...prevSelected, ingredient]
    );

    setValue("ingredients", selectedIngredients, {
      shouldValidate: true,
      shouldDirty: true, // This will mark the field as dirty
    });

    // setTimeout(() => {
    //   console.log("After short delay:");
    //   console.log("Current img form value:", watch("img"));
    //   console.log("Is form dirty?", formState.isDirty);
    //   console.log("Dirty fields:", formState.dirtyFields);
    // }, 100);
  };

  const onSubmit = async (formData) => {
    try {
      const form = {
        ...formData,
        ingredients_id: selectedIngredients.map((ingredient) => ingredient.id),
      };
      console.log(form);

      // First, create the dish without the image
      // const { data } = await api.put("/dishes", form);
      // const id = data.id;
      // console.log(id);

      // console.log(imagePreview);

      // const name = form.name || dish.name;
      // const category_id = form.category_id || dish.category_id;
      // const price = form.price || dish.price;
      // const description = form.description || dish.description;
      const ingredientsIdChanged =
        form.ingredients_id !==
        actualIngredients.reduce(
          (acc, ingredient) => [...acc, ingredient.id],
          []
        );
      // const img = form.img || dish.image;

      // Append all form fields to the FormData object
      // Perform check if any fields are empty

      console.log(form.ingredients_id);
      console.log(ingredientsIdChanged);
      console.log(
        actualIngredients.reduce(
          (acc, ingredient) => [...acc, ingredient.id],
          []
        )
      );

      Object.keys(form).forEach((key) => {
        if (
          form[key] === undefined ||
          !form[key] ||
          form[key].length <= 0 ||
          key === "img" ||
          key === "ingredients" ||
          (key === "ingredients_id" && !ingredientsIdChanged)
        ) {
          delete form[key];
        }
      });

      console.log(form);

      // Send the updated dish to the API if name, category, ingredients, description or price is changed
      if (Object.keys(form).length > 0) {
        await api.put(`/dishes/${id}`, form);
      }

      // If an image is provided, handle the image upload separately
      if (imageFile) {
        const formDataWithImage = new FormData();
        formDataWithImage.append("img", imageFile);

        console.log(imageFile);

        console.log(formDataWithImage);

        await api.patch(`/dishes/img/${id}`, formDataWithImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      // Handle successful submission (e.g., redirect or show a success message)
      console.log("Dish updated successfully");
      window.location.href = `/dish/${id}`;
    } catch (error) {
      // Handle error (e.g., show an error message)
      alert(error.response.data.message);
      console.error("Error updating dish:", error);
    }
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir o prato?")) {
      api.delete(`/dishes/${id}`);
      window.location.href = "/";
    }
  };

  return (
    <>
      <Header />
      <App>
        <div id="button-link">
          <Link to={window.location.origin}>
            <BackButton>
              <BsChevronLeft />
              voltar
            </BackButton>
          </Link>
        </div>
        <h1>Editar prato</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <label htmlFor="img">Imagem do prato</label>
            <FileInputWrapper>
              <FileInput
                type="file"
                id="img"
                accept="image/*"
                {...register("img")}
                onChange={handleFileChange}
              />
              <FileInputLabel
                htmlFor="img"
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
              placeholder={dish.name}
              className={`input ${errors.name ? "error" : ""}`}
              {...register("name")}
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
                <option value="" disabled defaultValue>
                  {dish.category_name}
                </option>
                {categories.map((category) =>
                  category.id !== dish.category_id ? (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ) : null
                )}
              </Select>
              <IoChevronDown />
            </SelectWrapper>
          </Container>
          <Container>
            <label htmlFor="ingredients">Ingredientes</label>
            <IngredientsSelector
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          </Container>
          <Container>
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              type="number"
              placeholder={dish.price}
              className={`input ${errors.price ? "error" : ""}`}
              {...register("price")}
            />
            {errors.price && (
              <span className="error-message">{errors.price.message}</span>
            )}
          </Container>
          <Container>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              placeholder={dish.description}
              className={`input ${errors.description ? "error" : ""}`}
              rows={8}
              cols={50}
              maxLength={150}
              {...register("description")}
            />
            {errors.description && (
              <span className="error-message">
                {errors.description.message}
              </span>
            )}
          </Container>
          <ButtonContainer>
            <Button id="delete-btn" onClick={handleDelete}>
              Excluir prato
            </Button>
            <button
              id="submit-btn"
              type="submit"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </button>
          </ButtonContainer>
        </Form>
      </App>
    </>
  );
}

export default DishEdit;
