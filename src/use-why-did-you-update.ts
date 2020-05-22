import { useEffect, useRef } from 'react';

export const getObjectsDiff = <T extends {}>(
    from: Partial<T> = {},
    to: Partial<T> = {},
    comparator?: <key extends keyof T>(from: T[key] | undefined, to: T[key] | undefined) => boolean
): Partial<{ [key in keyof T]: { from: T[key] | undefined; to: T[key] | undefined} }> => {
    const allKeys = Object.keys({ ...from, ...to }) as (keyof T)[];
    const changesObj: Partial<{ [key in keyof T]: { from: T[key] | undefined; to: T[key] | undefined } }> = {};
    allKeys.forEach(key => {
        if (typeof comparator !== 'undefined') {
            if (!comparator(from[key], to[key])) {
                changesObj[key] = {
                    from: from[key],
                    to: to[key]
                };
            }
        } else {
            if (from[key] !== to[key]) {
                changesObj[key] = {
                    from: from[key],
                    to: to[key]
                };
            }
        }
    });
    return changesObj;
};

export function useWhyDidYouUpdate<T>(name: string, props: T): void {
    const previousProps = useRef<T>();
    useEffect(() => {
        if (previousProps.current) {
            const changesObj = getObjectsDiff(previousProps.current, props);
            if (Object.keys(changesObj).length) {
                console.log('[why-did-you-update]', name, changesObj);
            }
        }
        previousProps.current = props;
    });
}
