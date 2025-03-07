"use client"

import PanelLayout from '@/components/layouts/PanelLayout'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import useDialog from '@/hooks/useDialog'
import ConfirmDelete from '@/components/molecules/ConfirmDelete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIdSelector } from '@/store/features/common/selectors'
import useSnackbar from '@/hooks/useSnakbar'
import { setDeleteId } from '@/store/features/common'
import { useDeleteFeedbackMutation, useGetAvgRatingMutation } from '@/services/api-service/admin/feedbacks'
import FeedbacksDatatable from './elements/FeedbacksDatatable'
import ViewFeedback from './elements/ViewFeedback'
import { avgRatingsSelector } from '@/store/features/questions/selectors'
import StatsCards from './elements/StatsCards'
import BackButton from '@/components/atoms/BackButton'

const currentRoute = "/admin/feedback"

const Feedbacks = () => {


    const dispatch = useDispatch()

    const [deleteFeedback] = useDeleteFeedbackMutation();
    const [getAvgRating] = useGetAvgRatingMutation()

    const { showError, showSuccess } = useSnackbar()

    const [refetchData, setRefetchData] = useState(false)

    const { openDialog: openDialogDel, handleCloseDialog: handleCloseDialogDel, handleOpenDialog: handleOpenDialogDel } = useDialog();
    const searchParams = useSearchParams()

    const deleteId = useSelector(deleteIdSelector)
    const avgRatings = useSelector(avgRatingsSelector)

    const feedbackId = searchParams.get("feedbackId")

    const [breadcrumbsData, setBreadcrumbsData] = useState([
        { label: "Feedback", href: currentRoute },
    ]);

    // Update title, breadcrumbs, and content dynamically based on query parameters
    useEffect(() => {
        if (feedbackId) {
            setBreadcrumbsData([
                { label: "Feedback", href: currentRoute }, { label: "View Feedback" }
            ]);
        } else {
            setBreadcrumbsData([]);
        }
    }, [searchParams]);


    const handleDelete = () => {
        deleteFeedback({ id: deleteId })
            .unwrap()
            .then((res) => {
                showSuccess(res?.message);
                dispatch(setDeleteId(null)); // Edit existing skill
                setRefetchData((prev) => !prev);
                handleCloseDialogDel()
                getAvgRating()
            })
            .catch((err) => {
                showError(err?.message);
            })
    }







    return (
        <PanelLayout pageTitle={"Feedback"} breadcrumbsData={breadcrumbsData}>
            {feedbackId && <BackButton />}
            {feedbackId ? <ViewFeedback /> : <>
                {/* <StatsCards averageRating={avgRatings?.avgRating} totalReviews={avgRatings?.totalRecords} /> */}
                <FeedbacksDatatable moduleName={"feedback"} deleteMutation={deleteFeedback} handleOpenDialogDel={handleOpenDialogDel} refetchData={refetchData} setRefetchData={setRefetchData} /></>}
            <ConfirmDelete message='Are you sure you want to delete this feedback?' open={openDialogDel} onClose={handleCloseDialogDel} onDelete={handleDelete} />
        </PanelLayout>
    )
}

export default Feedbacks