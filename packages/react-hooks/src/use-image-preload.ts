import { useEffect, useState } from 'react';

export function useImagePreload(
    imageSrc: string,
    placeholder: string = ''
): { source: string; loading: boolean; error: boolean } {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [source, setSource] = useState(placeholder);
    const handleLoad = () => {
        setLoading(false);
    };
    const handleError = () => {
        setLoading(false);
        setError(true);
    };
    useEffect(() => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = handleLoad;
        image.onerror = handleError;
    }, [imageSrc]);
    useEffect(() => {
        if (!loading && !error) {
            setSource(imageSrc);
        }
    }, [imageSrc, loading, error]);

    return { source, loading, error };
}
