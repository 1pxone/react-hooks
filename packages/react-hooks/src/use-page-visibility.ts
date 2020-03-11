import { useEffect, useState } from 'react';

const getUserAgentVisibilityProps = () => {
    let hidden = 'hidden';
    let visibilityChange = 'visibilitychange';
    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }
    return { visibilityChange, hidden };
};

export const usePageVisibility = () => {
    const { visibilityChange, hidden } = getUserAgentVisibilityProps();
    const [isVisible, setVisibility] = useState(true);

    const handleVisibilityChange = () => {
        if (document[hidden]) {
            setVisibility(false);
        } else {
            setVisibility(true);
        }
    };
    useEffect(() => {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
        () => {
            document.removeEventListener(visibilityChange, handleVisibilityChange);
        };
    }, []);

    return isVisible;
};
