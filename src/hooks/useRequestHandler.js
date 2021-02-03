import { useState } from 'react';

export default () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleRequest = (request) => {
        setLoading(true);
        setError(false);

        return request.then(setResponse)
                      .catch(error => setError({...error}))
                      .finally(() => setLoading(false));
    };

    return {isLoading, error, response, handleRequest};
};