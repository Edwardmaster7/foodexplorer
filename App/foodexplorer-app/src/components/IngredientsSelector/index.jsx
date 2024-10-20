import { useState, useMemo, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlinePlusSm } from "react-icons/hi";
import filterIcon from "../../assets/icons/search.svg";
import InputField from "../InputField";

import AutosizeInput from "../AutosizeInput";

import {
  IngredientsWrapper,
  SelectedIngredientsWrapper,
  Ingredient,
  IngredientInput,
  FilterWrapper,
  ResultsWrapper,
  CustomOption,
} from "./styles";

function IngredientsSelector({
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
  register,
  setValue,
  errors,
  earlyRequired,
  className
}) {
  const [addingIngredient, setAddingIngredient] = useState(false);
  const [addExistentIngredient, setExistentIngredient] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterResults, setFilterResults] = useState([]);

  const handleAddIngredientClick = () => {
    setAddingIngredient(true);
    setExistentIngredient(false);
  };

  // load the existing state of ingredients on the form values for validation purposes
  useEffect(() => {
    if(earlyRequired) {
      setValue("ingredients", selectedIngredients, {
        shouldValidate: true,
        shouldDirty: false,
      });
    }
  }, [ingredients]);

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

  const handleIngredientChange = (ingredientName) => {
    const newSelectedIngredients = selectedIngredients.includes(ingredientName)
      ? selectedIngredients.filter((name) => name !== ingredientName)
      : [...selectedIngredients, ingredientName];

    setSelectedIngredients(newSelectedIngredients);
    setValue("ingredients", newSelectedIngredients, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const memorizedResultsWrapper = useMemo(() => {
    return (
      <ResultsWrapper>
        {filterTerm
          ? filterResults
              .filter(
                (ingredient) => !selectedIngredients.includes(ingredient.name)
              )
              .map((result) => (
                <CustomOption
                  onClick={() => handleIngredientChange(result.name)}
                  className="result"
                  key={result.id}
                  children={result.name}
                />
              ))
          : ingredients
              .filter(
                (ingredient) => !selectedIngredients.includes(ingredient.name)
              )
              .map((ingredient) => (
                <CustomOption
                  onClick={() => handleIngredientChange(ingredient.name)}
                  className="result"
                  key={ingredient.id}
                  children={ingredient.name}
                />
              ))}
      </ResultsWrapper>
    );
  }, [filterResults, ingredients, selectedIngredients]);

  return (
    <IngredientsWrapper
      className={`${className} ${errors.ingredients ? "error" : ""}`}
    >
      <input
        type="hidden"
        {...register("ingredients", {
          required: "Pelo menos um ingrediente é requerido",
          validate: (value) =>
            value.length > 0 || "Pelo menos um ingrediente é requerido",
        })}
        value={selectedIngredients}
      />
      <SelectedIngredientsWrapper>
        {selectedIngredients.map((ingredientName, index) => (
          <Ingredient key={index}>
            <AutosizeInput
              type="text"
              value={ingredientName}
              placeholder="Banana"
              onChange={(e) => {
                const newSelectedIngredients = [...selectedIngredients];
                newSelectedIngredients[index] = e.target.value;
                setSelectedIngredients(newSelectedIngredients);
                setValue("ingredients", newSelectedIngredients, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              //when the ingredient is on the ingredient list, then the field is readOnly
              readOnly={ingredients.some(
                (ingredient) => ingredient.name === ingredientName
              )}
              //when the ingredient is not on the ingredient list, then the field is not readOnly
            />
            <IoClose
              onClick={() => {
                const newSelectedIngredients = selectedIngredients.filter(
                  (name) => name !== ingredientName
                );
                setSelectedIngredients(newSelectedIngredients);
                setValue("ingredients", newSelectedIngredients, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </Ingredient>
        ))}
        {addExistentIngredient ? (
          <button
            id="add-ingredient"
            type="button"
            className="hidden"
            onClick={handleAddIngredientClick}
          >
            Adicionar
            <HiOutlinePlusSm />
          </button>
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
              placeholder="Busque por ingredientes"
              onChange={(e) => handleFilterChange(e)}
              value={filterTerm}
            />
          </div>
          {memorizedResultsWrapper}
        </FilterWrapper>
      )}
      {errors.ingredients && (
        <span className="error-message">{errors.ingredients.message}</span>
      )}
    </IngredientsWrapper>
  );
}

export default IngredientsSelector;
