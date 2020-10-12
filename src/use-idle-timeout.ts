import { useCallback, useEffect } from 'react';

export function useIdleTimeOut(timeout?: number, onTimeOut?: () => void) {
    const fireOnTimeOut = useCallback(() => {
        if (typeof onTimeOut === 'function') {
            onTimeOut();
        }
    }, [onTimeOut]);

    useEffect(() => {
        if (typeof timeout !== 'undefined' && typeof window !== 'undefined') {
            let fireTimeOut: number;

            const set = () => {
                fireTimeOut = window.setTimeout(fireOnTimeOut, timeout);
            };

            const clear = () => {
                if (fireTimeOut) {
                    window.clearTimeout(fireTimeOut);
                }
            };
            const events = [
                'load',
                'mousemove',
                'mousedown',
                'click',
                'scroll',
                'keypress',
                'touchcancel',
                'touchend',
                'touchmove',
                'touchstart',
            ];

            const resetTimeout = () => {
                clear();
                set();
            };

            for (let i in events) {
                window.addEventListener(events[i], resetTimeout);
            }

            set();
            return () => {
                for (let i in events) {
                    window.removeEventListener(events[i], resetTimeout);
                    clear();
                }
            };
        }
    }, [fireOnTimeOut, timeout]);
}
