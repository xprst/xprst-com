import * as React from 'react';

export interface IEditStyle {
    maxWidth: number;
    top: number;
    left: number;
}

export const EditStyle = (config: IEditStyle): React.CSSProperties => {
    const styleObj: React.CSSProperties = {
        minHeight: '1em',
        lineHeight: '1.2',
        zIndex: 5,
        textAlign: 'center',
        outline: 'none',
        whiteSpace: 'normal',
        transformOrigin: '0px 0px 0px',
        transform: 'scale(1, 1) translate(-50%, -50%)',
        maxWidth: config.maxWidth,
        top: config.top,
        left: config.left
    };

    return styleObj;
};