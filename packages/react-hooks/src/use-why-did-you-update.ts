import { useEffect, useRef } from 'react';

export const getObjectsDiff = <T extends {}>(
    from: Partial<T> = {},
    to: Partial<T> = {},
    comparator?: <key extends keyof T>(from: T[key], to: T[key]) => boolean
): Partial<{ [key in keyof T]: { from: T[key]; to: T[key] } }> => {
    const allKeys = Object.keys({ ...from, ...to }) as (keyof T)[];
    // Use this object to keep track of changed props
    const changesObj: Partial<{ [key in keyof T]: { from: T[key]; to: T[key] } }> = {};
    // Iterate through keys
    allKeys.forEach(key => {
        // If previous is different from current
        if (typeof comparator !== 'undefined') {
            if (!comparator(from[key], to[key])) {
                // Add to changesObj
                changesObj[key] = {
                    from: from[key],
                    to: to[key]
                };
            }
        } else {
            if (from[key] !== to[key]) {
                // Add to changesObj
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
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef<T>();

    useEffect(() => {
        if (previousProps.current) {
            const changesObj = getObjectsDiff(previousProps.current, props);
            // If changesObj not empty then output to console
            if (Object.keys(changesObj).length) {
                console.log('[why-did-you-update]', name, changesObj);
            }
        }

        // Finally update previousProps with current props for next hook call
        previousProps.current = props;
    });
}
