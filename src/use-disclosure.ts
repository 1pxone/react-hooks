import { useEffect, useState } from 'react';

export const useDisclosure = ({
    initialState = false,
    onOpen,
    onClose
}: {
    initialState?: boolean;
    onOpen?(): void;
    onClose?(): void;
}) => {
    const [isOpen, toggle] = useState(initialState);

    useEffect(() => {
        if (isOpen !== initialState) {
            toggle(initialState);
        }
    }, [initialState]);

    const open = () => {
        toggle(true);
        if (typeof onOpen === 'function') {
            onOpen();
        }
    };

    const close = () => {
        toggle(false);
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    return { isOpen, open, close };
};
