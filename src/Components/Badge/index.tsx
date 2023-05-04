import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IBadgeProps {
    children: ReactNode;
    addClassName?: string;
    color?: string;
    to?: string;
}

export function Badge({
    children,
    to,
    color = 'bg-red-500',
    addClassName = '',
}: IBadgeProps) {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {to ? (
                <Link
                    to={to}
                    className={`p-3 rounded-full ${color} w-5 h-5 flex justify-center items-center`}
                >
                    {children}
                </Link>
            ) : (
                <div
                    className={`flex justify-center items-center ${addClassName}`}
                >
                    {children}
                </div>
            )}
        </>
    );
}
