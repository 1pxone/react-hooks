import { useEffect, useState } from 'react';

export const useNetworkStatus = () => {
    const [online, setOnline] = useState<boolean>(window?.navigator?.onLine);

    const onlineHandler = () => {
        setOnline(true);
    };
    const offlineHandler = () => {
        setOnline(false);
    };
    useEffect(() => {
        window.addEventListener('offline', offlineHandler);
        window.addEventListener('online', onlineHandler);
        return () => {
            window.removeEventListener('offline', offlineHandler);
            window.removeEventListener('online', onlineHandler);
        };
    });
    return online;
};
