import { useState, useRef } from 'react';

const useStateWithHistory = (initialState) => {
  const [state, setState] = useState(initialState);
  const historyIndex = useRef(-1);
  const history = useRef([initialState]);

  const setStateWithHistory = (newState) => {
    if (newState !== state) {
      history.current.splice(historyIndex.current + 1);
      history.current.push(newState);
      historyIndex.current = history.current.length - 1;
      setState(newState);
    }
  };

  const back = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setState(history.current[historyIndex.current]);
    }
  };

  const forward = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current++;
      setState(history.current[historyIndex.current]);
    }
  };

  const go = (index) => {
    if (index >= 0 && index < history.current.length) {
      historyIndex.current = index;
      setState(history.current[historyIndex.current]);
    }
  };

  const reset = () => {
    setState(initialState);
    historyIndex.current = -1;
    history.current = [initialState];
  };

  return [state, setStateWithHistory, { back, forward, go, reset }];
};

export default useStateWithHistory;
