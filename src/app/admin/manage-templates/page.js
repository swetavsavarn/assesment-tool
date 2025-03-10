"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import PanelLayout from "@/components/layouts/PanelLayout";
import ConfirmDelete from "@/components/molecules/ConfirmDelete";
import useDialog from "@/hooks/useDialog";
import useSnackbar from "@/hooks/useSnakbar";
import { deleteIdSelector } from "@/store/features/common/selectors";
import { setDeleteId } from "@/store/features/common";
import TemplatesDatatable from "./elements/TemplatesDatatable";
import UseTemplateModal from "./elements/UseTemplateModal";
import { useDeleteTemplateMutation, useEditTemplateMutation, useGenerateTestFromTemplateMutation, useGetAllTemplatesMutation } from "@/services/api-service/admin/templates";
import EditTemplateModal from "./elements/EditTemplateModal";




const currentRoute = "/admin/manage-templates";

const ManageTemplates = () => {

    const dispatch = useDispatch()

    const router = useRouter()
    // Hooks and State
    const searchParams = useSearchParams();
    const { showError, showSuccess } = useSnackbar();



    const deleteId = useSelector(deleteIdSelector);

    const [getAllTemplates] = useGetAllTemplatesMutation()
    const [generateTestFromTemplate] = useGenerateTestFromTemplateMutation()
    const [editTemplate] = useEditTemplateMutation()


    const [deleteTemplate] = useDeleteTemplateMutation();

    const [refetchData, setRefetchData] = useState(false);
    const [breadcrumbsData, setBreadcrumbsData] = useState([
        { label: "Templates", href: currentRoute },
    ]);

    const {
        openDialog: openUseTemplateDialog,
        handleCloseDialog: handleCloseUseTemplateDialog,
        handleOpenDialog: handleOpenUseTemplateDialog,
    } = useDialog();

    const {
        openDialog: openDeleteDialog,
        handleCloseDialog: closeDeleteDialog,
        handleOpenDialog: openDeleteDialogHandler,
    } = useDialog();

    const {
        openDialog: openEditTemplate,
        handleCloseDialog: handleCloseEditTemplate,
        handleOpenDialog: handleOpenEditTemplate,
    } = useDialog();

    const templateId = searchParams.get("templateId");

    useEffect(() => {
        getAllTemplates()
    }, [])



    useEffect(() => {
        if (templateId) {
            // getTemplate({ id: templateId })
        }
    }, [templateId])

    // Effects
    useEffect(() => {
        if (templateId) {
            setBreadcrumbsData([
                { label: "Templates", href: currentRoute },
                { label: "View Template" },
            ]);
        } else {
            setBreadcrumbsData([{ label: "Templates", href: currentRoute }]);
        }
    }, [templateId]);

    // Handlers
    const handleDelete = () => {
        deleteTemplate({ id: deleteId })
            .unwrap()
            .then((res) => {
                showSuccess(res?.message);
                dispatch(setDeleteId(null));
                setRefetchData((prev) => !prev);
                closeDeleteDialog();
                getAllTemplates()
            })
            .catch((err) => {
                showError(err?.message);
            });
    };

    const handleGenerateTest = (payload) => {

        let data = {
            templateId: payload?.templateId, candidateDetails: payload?.users?.map(({ email, name }) => ({
                candidateEmail: email,
                candidateName: name
            }))
        }

        generateTestFromTemplate(data)
            .unwrap()
            .then((res) => {
                showSuccess(res?.message);
                router.push("/admin/manage-tests");
                handleCloseUseTemplateDialog()

            })
            .catch((err) => {
                showError(err?.message);
            });
    };

    const handleEditTemplate = (payload) => {

        editTemplate(payload).unwrap()
            .then((res) => {
                showSuccess(res?.message);
                handleCloseEditTemplate()
                setRefetchData((prev) => !prev);
                getAllTemplates()
            })
            .catch((err) => {
                showError(err?.message);
            })

    }



    return (
        <PanelLayout pageTitle="Test Templates" breadcrumbsData={breadcrumbsData}>
            <>
                <TemplatesDatatable
                    handleOpenDialogDel={openDeleteDialogHandler}
                    handleOpenUseTemplateDialog={handleOpenUseTemplateDialog}
                    refetchData={refetchData}
                    handleOpenEditTemplate={handleOpenEditTemplate}
                    deleteMutation={deleteTemplate}
                    setRefetchData={setRefetchData}
                />

                <UseTemplateModal
                    openDialog={openUseTemplateDialog}
                    handleCloseDialog={handleCloseUseTemplateDialog}
                    handleGenerateTest={handleGenerateTest}
                />
                <EditTemplateModal handleEditTemplate={handleEditTemplate} handleCloseDialog={handleCloseEditTemplate} openDialog={openEditTemplate} handleOpenEditTemplate={handleOpenEditTemplate} />

                <ConfirmDelete
                    message="Are you sure you want to delete this template?"
                    open={openDeleteDialog}
                    onClose={closeDeleteDialog}
                    onDelete={handleDelete}
                />
                {/* <WarningModal /> */}
            </>
        </PanelLayout>
    );
};

export default ManageTemplates;
