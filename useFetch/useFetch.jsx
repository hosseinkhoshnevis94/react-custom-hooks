import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url, { signal });
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Request aborted');
                } else {
                    setError('Oops! Something went wrong. Please try again.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [url]);

    return {data, isLoading, error};
};

export default useFetch;
