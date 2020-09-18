import { useState, useEffect } from 'react';

function createTextArea(): HTMLTextAreaElement {
    const textArea: HTMLTextAreaElement = document.createElement('textarea');
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
    return textArea;
}

function select(textArea: HTMLTextAreaElement): void {
    textArea.focus();
    textArea.setSelectionRange(0, textArea.value.length);
}

function unselect(textArea: HTMLTextAreaElement): void {
    (window.getSelection() as Selection).removeAllRanges();
    textArea.blur();
}

function execCopy(): boolean {
    let result: boolean;
    try {
        result = document.execCommand('copy');
    } catch (error) {
        result = false;
    }
    return result;
}

function copyText(string: string): boolean {
    const textArea: HTMLTextAreaElement = createTextArea();
    textArea.value = string;
    document.body.appendChild(textArea);
    select(textArea);
    const result: boolean = execCopy();
    unselect(textArea);
    document.body.removeChild(textArea);
    return result;
}

export const useClipboard = (
    onCopyCb?: () => void,
    successResetIntervalMs: number = 500,
) => {
    const [hasCopied, setHasCopied] = useState(false);

    const copy = (value: string) => {
        const didCopy = copyText(value);
        setHasCopied(didCopy);

    };

    useEffect(() => {
        if (hasCopied) {
            if (typeof onCopyCb === 'function') {
                onCopyCb();
            }
            const id = setTimeout(() => {
                setHasCopied(false);
            }, successResetIntervalMs || 1500);

            return () => clearTimeout(id);
        }
    }, [hasCopied, successResetIntervalMs]);

    return { copy, hasCopied };
};
