import { useEffect, useState } from 'react';

export const useNetworkInfo = () => {
    const connection =
        navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const [type, setType] = useState(connection.effectiveType);
    const updateConnectionStatus = () => {
        setType(connection.effectiveType);
    };
    useEffect(() => {
        connection.addEventListener('change', updateConnectionStatus);
        () => {
            connection.removeEventListener('change', updateConnectionStatus);
        };
    }, []);
    return type;
};
