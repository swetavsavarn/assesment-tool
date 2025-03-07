import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

const BreadCrumbs = ({ pageTitle, breadcrumbsData = [] }) => {
    return (
        <div>
            <h1 className="text-white text-[20px] font-semibold">{pageTitle}</h1>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbsData?.map((breadcrumb, index) => {
                    const isLast = index === breadcrumbsData.length - 1;
                    return isLast ? (
                        <h3 key={index} className="text-white font-medium">
                            {breadcrumb.label}
                        </h3>
                    ) : (
                        <Link
                            key={index}
                            href={breadcrumb.href}
                            className="text-white underline"
                        >
                            {breadcrumb.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
};

export default BreadCrumbs;
