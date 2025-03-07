'use client';

import { usePathname, useSearchParams } from 'next/navigation';

const useFullUrl = () => {
    const pathname = usePathname(); // Get the current pathname
    const searchParams = useSearchParams(); // Get the current query parameters

    // Construct the full URL
    const getFullUrl = () => {
        const queryString = searchParams.toString();
        return `${pathname}${queryString ? `?${queryString}` : ''}`;
    };

    return getFullUrl();
};

export default useFullUrl;
