import { useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlinePlusSm } from "react-icons/hi";
import filterIcon from "../../assets/icons/search.svg";
import InputField from "../InputField";
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
}) {
  const [addingIngredient, setAddingIngredient] = useState(false);
  const [addExistentIngredient, setExistentIngredient] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterResults, setFilterResults] = useState([]);

  const handleAddIngredientClick = () => {
    setAddingIngredient(true);
    setExistentIngredient(false);
  };

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
    setFilterResults(
      ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().startsWith(event.target.value.toLowerCase())
      )
    );
  };

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((i) => i !== ingredient)
        : [...prevSelected, ingredient]
    );

    setValue("ingredients", selectedIngredients, {
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
    <IngredientsWrapper className={`input ${errors.ingredients ? "error" : ""}`}>
      <SelectedIngredientsWrapper>
        {selectedIngredients.map((ingredient) => (
          <Ingredient key={ingredient.id}>
            <IngredientInput
              type="text"
              value={ingredient.name}
              placeholder="Ex.: Banana"
              onChange={(e) => {
                setSelectedIngredients(
                  selectedIngredients.map((selIngredient) =>
                    selIngredient.id === ingredient.id
                      ? { ...selIngredient, name: e.target.value }
                      : selIngredient
                  )
                );
                setValue(
                  "ingredients",
                  selectedIngredients.map((selIngredient) =>
                    selIngredient.id === ingredient.id
                      ? { ...selIngredient, name: e.target.value }
                      : selIngredient
                  ),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
              }}
            />
            <IoClose
              onClick={() => {
                setSelectedIngredients(
                  selectedIngredients.filter(
                    (selIngredient) => selIngredient.id !== ingredient.id
                  )
                );
                setValue(
                  "ingredients",
                  selectedIngredients.filter(
                    (selIngredient) => selIngredient.id !== ingredient.id
                  ),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
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
        <span className="error-message">{errors.ingredients.message}</span>
      )}
    </IngredientsWrapper>
  );
}

export default IngredientsSelector;