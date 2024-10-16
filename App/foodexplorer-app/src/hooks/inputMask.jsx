import { useEffect, useRef } from 'react';
import Inputmask from 'inputmask';

function useInputMask(maskOptions) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      Inputmask(maskOptions).mask(inputRef.current);
    }
    return () => {
      if (inputRef.current) {
        Inputmask.remove(inputRef.current);
      }
    };
  }, [maskOptions]);

  return inputRef;
}

export default useInputMask;
