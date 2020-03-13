import * as React from 'react';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

export function useElementFocusHighLight<T extends HTMLElement, P extends {}>({
    backdropColor = 'rgba(0,0,0,0.75)',
    zIndex = 999999,
    overlay = false
}: {
    backdropColor?: string;
    zIndex?: number;
    overlay?: boolean;
}): [T | undefined | null, Dispatch<SetStateAction<T | undefined | null>>, React.ElementType] {
    const [currentEl, setEl] = useState<T | undefined | null>(null);

    let Portal = (props: P) => null;
    if (currentEl) {
        const rect = currentEl.getBoundingClientRect();

        const commonStyles: React.CSSProperties = {
            zIndex,
            backgroundColor: backdropColor,
            position: 'absolute'
        };
        const topDivStyle: React.CSSProperties = {
            ...commonStyles,
            top: 0,
            width: '100%',
            height: rect.top
        };
        const bottomDivStyle: React.CSSProperties = {
            ...commonStyles,
            bottom: 0,
            width: '100%',
            height: window.innerHeight - rect.bottom
        };
        const leftDivStyle: React.CSSProperties = {
            ...commonStyles,
            left: 0,
            top: rect.top,
            width: rect.left,
            height: rect.height
        };
        const rightDivStyle: React.CSSProperties = {
            ...commonStyles,
            right: 0,
            top: rect.top,
            width: window.innerWidth - rect.right,
            height: rect.height
        };
        const renderOverlay = (props: P) => {
            if (overlay) {
                const wrapperDivStyle: React.CSSProperties = {
                    zIndex: zIndex + 1,
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0
                };
                return <div {...props} style={wrapperDivStyle} />;
            } else {
                return null;
            }
        };

        const backdropDivs = (props: P) => {
            const appliedOuterProps = overlay ? {} : props;
            return (
                <div {...appliedOuterProps}>
                    <div style={topDivStyle} />
                    <div style={bottomDivStyle} />
                    <div style={leftDivStyle} />
                    <div style={rightDivStyle} />
                    {renderOverlay(props)}
                </div>
            );
        };

        // @ts-ignore
        Portal = (props: P) => createPortal(backdropDivs(props), document.body);
    }

    return [currentEl, setEl, Portal];
}
