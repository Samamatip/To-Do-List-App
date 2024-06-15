import { useEffect } from 'react';

export const useFetch = (fetchFunction, setData, setLoading) => {
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await fetchFunction();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchFunction, setData, setLoading]);
};
