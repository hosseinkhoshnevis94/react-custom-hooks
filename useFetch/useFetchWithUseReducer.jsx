import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { isLoading: false, error: null, data: action.payload };
    case "error":
      return { isLoading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

const useFetchV2 = (url) => {
  const initialValue = { data: null, isLoading: false, error: null };
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(url, { signal });
        const jsonData = await response.json();
        dispatch({ type: "success", payload: jsonData });
      } catch (err) {
        dispatch({
          type: "error",
          payload: "Oops! Something went wrong. Please try again.",
        });
      } 
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return {data:state.data, isLoading: state.isLoading, error: state.error};
};

export default useFetchV2;
