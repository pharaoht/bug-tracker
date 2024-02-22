import React, { useState } from 'react';
import axios from 'axios';

const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    async function sendRequest(requestConfig, callBack, method) {

        setIsLoading(true);

        try {
            const response = await axios({
                method: method,
                url: requestConfig.url,
                headers: requestConfig.headers || {},
                data: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });

            if (response.status !== 200) {
                throw new Error('Request Failed');
            }

            callBack(response.data);

            setIsLoading(false);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }

    }

    return { isLoading, error, sendRequest };

};

export default useHttp;