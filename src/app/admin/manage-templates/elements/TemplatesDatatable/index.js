import CustomDatatable from '@/components/molecules/CustomDatatable';
import React, { useEffect } from 'react'
import { columns } from './columns';
import useDatatable from '@/hooks/useDatatable_old';

import { useGetAllTemplatesPaginationMutation } from '@/services/api-service/admin/templates';

const TemplatesDatatable = ({ handleOpenDialogDel, handleOpenDialog, refetchData, buttons, handleOpenUseTemplateDialog, handleOpenEditTemplate, deleteMutation, setRefetchData }) => {



    const [getData] = useGetAllTemplatesPaginationMutation()


    const {
        pagination,
        data,
        handlePageChange,
        handleSearch,
        clearSearch,
        fetchData,
        rowSelectionModel,
        setRowSelectionModel
    } = useDatatable({ key: "templates", mutation: getData, filtersData: {} });


    useEffect(() => {

        fetchData({ currentPage: 1, query: "" })

    }, [refetchData])




    return (
        <CustomDatatable
            columns={columns({ handleOpenDialogDel, handleOpenDialog, handleOpenUseTemplateDialog, handleOpenEditTemplate })}
            rows={data}
            title="Templates"
            pageSize={5}
            checkboxSelection={false}
            handlePageChange={handlePageChange}
            pagination={pagination}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
            buttons={buttons}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            deleteMutation={deleteMutation}
            setRefetchData={setRefetchData}
            moduleName={"template"}
        />
    )
}

export default TemplatesDatatable