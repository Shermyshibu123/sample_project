import React from 'react';

interface IconProps {
    className: string;
    iconRef: string;
}

const Icon = ({ className, iconRef }: IconProps) => (
    <span className={className}>
        <svg>
            <use xlinkHref={iconRef} />
        </svg>
    </span>
);

export default Icon;