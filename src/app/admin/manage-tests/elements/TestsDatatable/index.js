import CustomDatatable from '@/components/molecules/CustomDatatable';
import React, { useEffect, useMemo, useRef } from 'react'
import { columns } from './columns';
import useFullUrl from '@/hooks/useFullUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setQuestion } from '@/store/features/questions';
import useDatatable from '@/hooks/useDatatable';
import { useGetAllTestsMutation } from '@/services/api-service/admin/questions';
import TestsFilter from './TestsFilter';
import { formatFiltersForTest, getFiltersCount, getFiltersCountChange } from '@/utils';

const TestsDatatable = ({
    handleOpenDialogDel,
    handleOpenDialog,
    refetchData,
    buttons,
    deleteMutation,
    setRefetchData,
    moduleName,
    filters,
    setFilters
}) => {


    const [getData] = useGetAllTestsMutation()


    const url = useFullUrl()

    const router = useRouter()

    const dispatch = useDispatch();

    const {
        pagination,
        data,
        handlePageChange,
        handleSearch,
        clearSearch,
        fetchData,
        setPagination,
        rowSelectionModel,
        setRowSelectionModel
    } = useDatatable({ key: "tests", mutation: getData, filtersData: formatFiltersForTest(filters), method: "POST" });


    useEffect(() => {

        fetchData({ currentPage: 1, query: "" })

    }, [refetchData]);

    const formatFilters = useMemo(() => (formatFiltersForTest(filters)), [filters]);

    console.log(filters, "formatFilters>>>");


    const prevFiltersRef = useRef();

    useEffect(() => {
        // Only fetch data if formatFilters has changed
        if (prevFiltersRef.current && JSON.stringify(prevFiltersRef.current) !== JSON.stringify(formatFilters)) {
            console.log(formatFilters, "formatFilters>>>");

            // Call your fetchData method
            fetchData({
                currentPage: 1,
            });
        }

        // Update the ref with the current formatFilters
        prevFiltersRef.current = formatFilters;
    }, [formatFilters]);


    return (
        <CustomDatatable
            columns={columns({ handleOpenDialogDel, handleOpenDialog })}
            rows={data}
            title="Tests"
            pageSize={5}
            checkboxSelection={false}
            onRowClick={(data) => {
                dispatch(setQuestion(data?.row))
                router.push(`${url}?testId=${data?.row?.id}`)
            }}
            handlePageChange={handlePageChange}
            pagination={pagination}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            buttons={buttons}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            deleteMutation={deleteMutation}
            setRefetchData={setRefetchData}
            moduleName={moduleName}
            filters={<TestsFilter filters={filters} setFilters={setFilters} />}
        />
    )
}

export default TestsDatatable