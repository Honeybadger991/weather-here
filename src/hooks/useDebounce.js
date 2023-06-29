import { useState, useEffect } from "react";

const useDebounce = (callback, delay) =>{

    const [timer, setTimer] = useState(null);

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, [timer]);

    const debouncedCallback = (...args) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimer(newTimer);
    }

    return debouncedCallback;
}

export default useDebounce;
