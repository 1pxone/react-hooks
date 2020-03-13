import { useCallback, useEffect, useRef } from 'react';

export function useDelay(callback: () => void, delay: number) {
    const timeout = useRef(0);
    const setLastActionTimestamp = useCallback(() => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = window.setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            }
        }, delay);
    }, [timeout.current]);

    useEffect(() => {
        return () => {
            timeout.current && clearTimeout(timeout.current);
        }
    }, [timeout]);

    return setLastActionTimestamp;
}
