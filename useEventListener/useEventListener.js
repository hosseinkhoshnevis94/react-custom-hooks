import { useEffect } from 'react';

function useEventListener(eventName, handler, element = window) {
  useEffect(() => {
    const isValid = element && element.addEventListener;
    if (!isValid) return;

    element.addEventListener(eventName, handler);

    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
}

export default useEventListener;
