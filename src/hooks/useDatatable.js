import { useRef, useLayoutEffect, useState } from "react";

const useDatatable = ({ key, mutation, filtersData, method = "GET" }) => {
    const defaultPagination = {
        currentPage: 1,
        itemsPerPage: 10,
        total: 0,
        totalPages: 0,
        loading: true,
        query: "",
    };

    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [pagination, setPagination] = useState(() => {
        const storedData = sessionStorage.getItem(key);
        return storedData ? { ...JSON.parse(storedData), loading: true } : defaultPagination;
    });
    const [data, setData] = useState([]);
    const debounceRef = useRef(null);

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
        fetchData({
            currentPage: page,
            query: pagination?.query,
        });
    };

    const handleItemsPerPageChange = (pageSize) => {
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
            itemsPerPage: pageSize,
        }));
    };

    const handleSearch = (value) => {
        fetchData({
            currentPage: 1,
            query: value,
        });
    };

    const clearSearch = () => {
        fetchData({
            currentPage: 1,
            query: "",
        });
    };

    const cleanFiltersData = () => {
        const cleanedData = {};
        for (const key in filtersData) {
            if (filtersData[key] !== null && filtersData[key] !== "") {
                cleanedData[key] = filtersData[key];
            }
        }
        return cleanedData;
    };

    const fetchData = ({ currentPage, query }) => {
        setPagination((prev) => ({ ...prev, currentPage, query: query ?? prev.query, loading: true }));

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            mutation({
                ...(cleanFiltersData() || {}),
                page: currentPage,
                limit: 10,
                search: query ?? pagination?.query,
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
        }, 500); // Adjust debounce delay as needed (500ms in this case)
    };

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
        setRowSelectionModel,
    };
};

export default useDatatable;
