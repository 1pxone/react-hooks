import { useState, useEffect, useCallback } from 'react';

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

function safelyExecCommand(command: string): boolean {
    let result: boolean;
    try {
        result = document.execCommand(command);
    } catch (error) {
        result = false;
    }
    return result;
}

export function copyText(string: string): boolean {
    const textArea: HTMLTextAreaElement = createTextArea();
    textArea.value = string;
    document.body.appendChild(textArea);
    select(textArea);
    const result: boolean = safelyExecCommand('copy');
    unselect(textArea);
    document.body.removeChild(textArea);
    return result;
}

export function useClipboard(value: string) {
    const [hasCopied, setHasCopied] = useState(false);

    const onCopy = useCallback(() => {
        const didCopy = copyText(value);
        setHasCopied(didCopy);
    }, [value]);

    useEffect(() => {
        if (hasCopied) {
            const id = setTimeout(() => {
                setHasCopied(false);
            }, 1500);

            return () => clearTimeout(id);
        }
    }, [hasCopied]);

    return { value, onCopy, hasCopied };
}

export default useClipboard;
