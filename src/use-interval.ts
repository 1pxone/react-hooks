import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number): void {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick(): void {
            if (savedCallback && savedCallback.current){
                savedCallback.current();
            }
        }
        if (delay !== null) {
            const id: number = window.setInterval(tick, delay);

            return () => clearInterval(id);
        }
    }, [delay]);
}
