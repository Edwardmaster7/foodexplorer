import React, { useState, useRef, useEffect } from 'react';
import { IngredientInput } from '../IngredientsSelector/styles';

const AutosizeInput = ({ value, onChange, ...props }) => {
  const [inputWidth, setInputWidth] = useState('auto');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const textWidth = getTextWidth(value, getComputedStyle(inputRef.current));
      setInputWidth(`${Math.max(20, textWidth + 10)}px`);
    }
  }, [value]);

  const getTextWidth = (text, font) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font.font;
    return context.measureText(text).width;
  };

  return (
    <IngredientInput
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      width={inputWidth}
      {...props}
    />
  );
};

export default AutosizeInput;