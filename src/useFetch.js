import {useState, useEffect} from "react";

const useFetch = (url, selector = (data) => data) => { 
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
            .then((res) => {
                if(!res.ok){
                    throw Error("Could not fetch the data, res is not ok");
                }

                return res.json();
            })
            .then((data) => {
                setData(selector(data));
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === "AbortMessage"){
                    
                }else{
                    setIsLoading(false);
                    setError(err.message);
                }
            })
        
            return () => abortCont.abort();
    }, [url]);

    return {data, isLoading, error};
}

export default useFetch;