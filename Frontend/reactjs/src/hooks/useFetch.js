import { useEffect, useState } from "react";
import axios from "axios";
import { useAxiosPrivate } from "./useAxiosPrivate";

const useFetch = (url) => {
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axiosPrivate.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
        };
        fetchData();
        
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
        const res = await axios.get(url);
        setData(res.data);
        } catch (err) {
        setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
    };

    export default useFetch;