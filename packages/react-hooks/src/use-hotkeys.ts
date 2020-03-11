import { useEffect } from 'react';

const keysMap = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    pauseBreak: 19,
    capsLock: 20,
    escape: 27,
    pageup: 33,
    pagedown: 34,
    end: 35,
    home: 36,
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40,
    insert: 45,
    delete: 46
};

export function useHotkeys(ref, bindings) {
    console.log(ref);
    useEffect(() => {
        ref.current.addEventListener('keydown', e => {
            console.log(e.keyCode);
        });
    }, [ref.current]);
}
