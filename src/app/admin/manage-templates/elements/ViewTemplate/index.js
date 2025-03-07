"use client"
import Button from "@/components/atoms/Button";
import useSnackbar from "@/hooks/useSnakbar";
import { useGetTestDetailsMutation, useSendTestMutation } from "@/services/api-service/admin/questions";
import { ENDPOINTS } from "@/store/endpoints";
import { setLoading } from "@/store/features/alerts";
import { authTokenSelector } from "@/store/features/auth/selectors";
import { testSelectorAdmin } from "@/store/features/questions/selectors";
import { formatDate } from "@/utils";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import TestStatus from "@/components/atoms/TestStatus";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useGetTemplateMutation } from "@/services/api-service/admin/templates";


const ViewTemplate = () => {
    const [isTestSent, setIsTestSent] = useState(false); // Tracks if the test is sent

    const searchParams = useSearchParams()
    const templateId = searchParams.get("templateId")

    const [getTemplate] = useGetTemplateMutation();
    const [sendTest] = useSendTestMutation();


    const dispatch = useDispatch()

    const token = useSelector(authTokenSelector)
    const test = useSelector(testSelectorAdmin)

    const { showSuccess, showError } = useSnackbar()



    useEffect(() => {
        getTemplate({ id: templateId })
    }, [])

    const handleSendTest = () => {

        sendTest({ testId })
            .unwrap()
            .then((res) => {
                showSuccess(res?.message);
                setIsTestSent(true); // Update status to sent
            })
            .catch((err) => {
                showError(err?.message);
            })

    };

    const handleViewQuestions = async () => {

        const url = `${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.ADMIN.TEST.VIEW_QUESTIONS_PDF}?testId=${testId}`;

        try {

            dispatch(setLoading(true))
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/pdf", // Specify the expected content type
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
            }

            // Convert response to Blob
            const blob = await response.blob();

            // Create a URL for the Blob and open it in a new tab
            const blobUrl = URL.createObjectURL(blob);
            window.open(blobUrl, "_blank");

            // Optional: Revoke the Blob URL after some time to free memory
            setTimeout(() => URL.revokeObjectURL(blobUrl), 60000); // Revoke after 1 minute
        } catch (error) {
            showError("Error fetching PDF")
        } finally {
            dispatch(setLoading(false))
        }
    };




    return (
        <div className=" mx-auto p-8 bg-primary-200 rounded-lg shadow-lg mt-10 space-y-8">
            {/* Candidate Details */}
            <div className="flex justify-end"><TestStatus status={test?.status} /></div>
            <SectionBox title="Candidate details">
                <div className="md:grid grid-cols-2 gap-4">
                    <DetailRow label="Name" value={test?.candidateName} />
                    <DetailRow label="Email" value={test?.candidateEmail} />
                    <DetailRow label="Position" value={test?.candidateJobPosition} />
                    <DetailRow label="Skills" value={test?.skillName?.map((item) => item?.name).join(",")} />
                </div>
            </SectionBox>

            {/* Test Overview */}
            <SectionBox title="Test overview">
                <div className="grid grid-cols-2 gap-4">
                    {/* <DetailRow label="Status" value={test?.status?.toUpperCase()} /> */}
                    {/* <DetailRow label="Status" value={<TestStatus status={test?.status} />} /> */}
                    <DetailRow label="Total questions" value={test?.totalQuestion} />
                    <DetailRow label="Created on" value={formatDate(test?.createdAt)} />
                    <DetailRow label="Completed at" value={test?.testCompletedOn ? formatDate(+test?.testCompletedOn * 1000, true) : "-"} />
                    <DetailRow label="Score" value={test?.score} />
                    {/* <DetailRow label="Remarks" value="-" /> */}
                </div>
            </SectionBox>

            {/* Screen Recording */}

            {test?.recordingUrl && <SectionBox title="Screen recording">
                <div className="flex items-center justify-center">
                    {/* Clickable Thumbnail with Play Icon */}
                    <div className="relative">
                        <a
                            href={test?.recordingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            {/* Thumbnail Placeholder */}
                            <img
                                src="../../video-thumbnail.png"
                                alt="Video Thumbnail"
                                className="rounded-md border object-contain h-[250px]"
                            />
                            {/* Play Icon Overlay */}
                            <PlayCircleOutlineIcon
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '3rem',
                                    color: 'white',
                                    textShadow: '0px 0px 5px rgba(0, 0, 0, 0.8)',
                                }}
                            />
                        </a>
                    </div>
                </div>
            </SectionBox>}


            {/* Test Status */}
            <SectionBox title="Test status">
                <div className="grid grid-cols-2 gap-4">
                    <StatusRow label="Test sent" status={test?.isTestSent || isTestSent} />
                    <StatusRow label="Test completed" status={test?.testCompletedOn} />
                </div>
            </SectionBox>

            {/* Action Buttons */}
            <footer className="mt-8 flex justify-end space-x-4">
                {!["expired", "finished"].includes(test?.status) && <Button
                    onClick={handleSendTest}
                    // disabled={isTestSent || test?.isTestSent}
                    variant="primary"
                >
                    {isTestSent || test?.isTestSent ? "Resend Test" : "Send Test"}
                </Button>}
                <Button variant="primary" onClick={handleViewQuestions}>
                    View Test Questions
                </Button>
            </footer>
        </div>
    );
};

const SectionBox = ({ title, children }) => (
    <div className="bg-gray-900 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);



const DetailRow = ({ label, value }) => {
    const isValueTooLong = false; // Adjust length limit based on your design

    return (
        <div className="flex flex-col gap-y-1">
            <p className="text-gray-300 font-semibold">{label}:</p>
            <div className="flex justify-between gap-x-2 items-center bg-gray-800 p-4 rounded-md">

                <Tooltip title={value} arrow placement="top">
                    <p
                        className={`text-gray-200 truncate `}
                        style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                        {value}
                    </p>
                </Tooltip>
            </div>
        </div>
    );
};


const StatusRow = ({ label, status }) => (
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
        <p className="text-gray-300 font-semibold">{label}:</p>
        <p className={status ? "text-green-500" : "text-red-500"}>
            {status ? "Yes" : "No"}
        </p>
    </div>
);

export default ViewTemplate;
