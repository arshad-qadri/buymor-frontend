const { useState, useEffect, useRef } = require("react");

const useDebounce = (value, delay = 300) => {
  const [debounceValue, setDebaouValue] = useState(value);
  const timeID = useRef(null);
  useEffect(() => {
    if (value) {
      if (timeID.current) {
        clearTimeout(timeID.current);
      }
     timeID.current =  setTimeout(() => {
        setDebaouValue(value);
      }, delay);
    }
    return () => {
      if (timeID.current) {
        clearTimeout(timeID.current);
      }
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce