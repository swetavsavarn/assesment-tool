import { useLayoutEffect, useState, useMemo } from "react";

const useDatatable = ({ key, mutation, filtersData }) => {

    const defaultPagination = {
        currentPage: 1,
        itemsPerPage: 10,
        total: 0,
        totalPages: 0,
        loading: true,
        query: "",
    };

    const [rowSelectionModel, setRowSelectionModel] = useState([])

    const [pagination, setPagination] = useState(() => {
        const storedData = sessionStorage.getItem(key);
        return storedData ? { ...JSON.parse(storedData), loading: true } : defaultPagination;
    });

    const [data, setData] = useState([]);

    // Memoize filtersData to avoid unnecessary re-renders
    const memoizedFiltersData = useMemo(() => filtersData, [filtersData]);

    useLayoutEffect(() => {
        for (let i = sessionStorage.length - 1; i >= 0; i--) {
            const storageKey = sessionStorage.key(i);
            if (storageKey.includes("datatable")) {
                sessionStorage.removeItem(storageKey);
            }
        }
        sessionStorage.setItem(key, JSON.stringify(pagination));
    }, [key, pagination.currentPage, pagination.itemsPerPage, pagination.query]);

    const handlePageChange = (page) => {
        setPagination((prev) => ({ ...prev, currentPage: page }));
    };

    const handleItemsPerPageChange = (pageSize) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
            itemsPerPage: pageSize,
        }));
    };

    const handleSearch = (value) => {
        setPagination((prev) => ({ ...prev, currentPage: 1, query: value }));
    };

    const clearSearch = () => {
        setPagination((prev) => ({ ...prev, query: "" }));
    };

    const cleanFiltersData = () => {
        const cleanedData = {};
        for (const key in memoizedFiltersData) {
            if (memoizedFiltersData[key] !== null && memoizedFiltersData[key] !== "") {
                cleanedData[key] = memoizedFiltersData[key];
            }
        }
        return cleanedData;
    };

    const fetchData = ({ currentPage, query }) => {
        setPagination((prev) => ({ ...prev, currentPage, query, loading: true }));

        mutation({
            page: currentPage,
            limit: pagination.itemsPerPage,
            search: pagination.query || "",
            ...(cleanFiltersData() || {}),
        })
            .unwrap()
            .then((res) => {
                const responseData = res?.data || {};
                const { data: records, pagination: paging } = responseData;

                setData(records || []);
                setPagination((prev) => ({
                    ...prev,
                    total: paging?.totalRecords || paging?.totalCount || 0,
                    totalPages: paging?.totalPages || 0,
                }));

                if ((records?.length || 0) === 0 && pagination.currentPage > 1) {
                    setPagination((prev) => ({
                        ...prev,
                        currentPage: prev.currentPage - 1,
                    }));
                }

            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            })
            .finally(() => {
                setPagination((prev) => ({ ...prev, loading: false }));
            });
    };

    useLayoutEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchData({
                currentPage: pagination.currentPage,
                query: pagination.query,
            });
        }, 200);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [pagination.currentPage, pagination.itemsPerPage, pagination.query, memoizedFiltersData?.type]);

    return {
        pagination,
        data,
        handlePageChange,
        handleItemsPerPageChange,
        handleSearch,
        clearSearch,
        fetchData,
        setPagination,
        rowSelectionModel,
        setRowSelectionModel
    };
};

export default useDatatable;
