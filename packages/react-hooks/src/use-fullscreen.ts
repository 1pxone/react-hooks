import { useEffect, useState } from 'react';

interface IElementFullScreen<TElement> extends HTMLElement {
    readonly fullscreenElement: TElement;
    readonly mozFullScreenElement: TElement;
    readonly webkitFullscreenElement: TElement;
    readonly msFullscreenElement: TElement;
    readonly mozFullScreen: boolean;
    readonly fullscreen: boolean;
    readonly webkitIsFullScreen: boolean;
    readonly fullScreenMode: boolean;
    exitFullscreen(): Promise<void>;
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
    requestFullscreen(): Promise<void>;
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
}

export function isFullScreenElement<TElement>(el: TElement): boolean {
    const d = (document as unknown) as IElementFullScreen<TElement>;
    if (el) {
        return Boolean(
            d.fullscreenElement === el ||
                d.mozFullScreenElement === el ||
                d.webkitFullscreenElement === el ||
                d.msFullscreenElement === el
        );
    }

    return Boolean(
        d.fullscreenElement ||
            d.mozFullScreenElement ||
            d.webkitFullscreenElement ||
            d.msFullscreenElement ||
            d.fullscreen ||
            d.mozFullScreen ||
            d.webkitIsFullScreen ||
            d.fullScreenMode
    );
}

export const useFullScreen = <TElement>(options: { element?: TElement } = {}) => {
    const fsEl = options && ((options.element as unknown) as IElementFullScreen<TElement>);
    const initialState = window ? false : isFullScreenElement(fsEl);
    const [isFullScreen, setFullScreen] = useState(initialState);
    const d = (document as unknown) as IElementFullScreen<TElement>;
    const openFullScreen = () => {
        const el: HTMLElement & {
            mozRequestFullScreen?(): void;
            webkitRequestFullscreen?(): void;
            msRequestFullscreen?(): void;
        } = fsEl || document.documentElement;

        if (el.requestFullscreen) {
            return el.requestFullscreen();
        }
        if (el.mozRequestFullScreen) {
            return el.mozRequestFullScreen();
        }
        if (el.webkitRequestFullscreen) {
            return el.webkitRequestFullscreen();
        }
        if (el.msRequestFullscreen) {
            return el.msRequestFullscreen();
        }
    };

    const closeFullScreen = () => {
        if (d.exitFullscreen) {
            return d.exitFullscreen();
        }
        if (d.mozCancelFullScreen) {
            return d.mozCancelFullScreen();
        }
        if (d.webkitExitFullscreen) {
            return d.webkitExitFullscreen();
        }
        if (d.msExitFullscreen) {
            return d.msExitFullscreen();
        }
    };

    function handleChange(): void {
        setFullScreen(isFullScreenElement(fsEl));
    }

    useEffect(() => {
        document.addEventListener('webkitfullscreenchange', handleChange, false);
        document.addEventListener('mozfullscreenchange', handleChange, false);
        document.addEventListener('msfullscreenchange', handleChange, false);
        document.addEventListener('MSFullscreenChange', handleChange, false);
        document.addEventListener('fullscreenchange', handleChange, false);

        return () => {
            document.removeEventListener('webkitfullscreenchange', handleChange);
            document.removeEventListener('mozfullscreenchange', handleChange);
            document.removeEventListener('msfullscreenchange', handleChange);
            document.removeEventListener('MSFullscreenChange', handleChange);
            document.removeEventListener('fullscreenchange', handleChange);
        };
    }, [options.element]);

    return {
        isFullScreen,
        open: openFullScreen,
        close: closeFullScreen,
        toggleFullScreen: isFullScreen ? closeFullScreen : openFullScreen
    };
};
