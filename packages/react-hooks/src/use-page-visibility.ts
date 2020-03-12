import { useEffect, useState } from 'react';

interface IDocumentMultiBrowser {
    hidden?: boolean;
    msHidden?: boolean;
    webkitHidden?: boolean;
}

const getUserAgentVisibilityProps = () => {
    let hidden = 'hidden';
    let visibilityChange = 'visibilitychange';

    if (typeof (document as IDocumentMultiBrowser).hidden !== 'undefined') {
        hidden = 'hidden';
        visibilityChange = 'visibilitychange';
    } else if (typeof (document as IDocumentMultiBrowser).msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
    } else if (typeof (document as IDocumentMultiBrowser).webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        visibilityChange = 'webkitvisibilitychange';
    }
    return { visibilityChange, hidden };
};

export const usePageVisibility = () => {
    const { visibilityChange, hidden } = getUserAgentVisibilityProps();
    const [isVisible, setVisibility] = useState(true);

    const handleVisibilityChange = () => {
        // @ts-ignore
        if (document[hidden]) {
            setVisibility(false);
        } else {
            setVisibility(true);
        }
    };
    useEffect(() => {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
        return () => {
            document.removeEventListener(visibilityChange, handleVisibilityChange);
        };
    }, []);

    return isVisible;
};
