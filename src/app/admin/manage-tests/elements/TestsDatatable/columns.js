import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";
import { formatDate } from "@/utils";
import { useDispatch } from "react-redux";
import { setDeleteId } from "@/store/features/common";
import TestStatus from "@/components/atoms/TestStatus";

export const columns = ({ handleOpenDialogDel }) => ([
    {
        field: "candidateName",
        headerName: "Candidate name",
        flex: 1.6, // Adjusted to flex to take remaining space
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        selectable: false,
    },
    {
        field: "candidateEmail",
        headerName: "Email",
        flex: 2, // Adjusted to flex to take remaining space
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        selectable: false,
    },
    {
        field: "candidateJobPosition",
        headerName: "Position",
        flex: 2, // Adjusted to flex to take remaining space
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        selectable: false,
    },
    {
        field: "totalDuration",
        headerName: "Duration",
        flex: 1, // Adjusted to flex to take remaining space
        disableColumnMenu: true,
        sortable: false,
        filterable: true,
        renderCell: (params) => {
            return params.value + " Minutes"
        },
        selectable: false,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1.3, // Adjusted to flex to take remaining space
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        renderCell: (params) => {
            return <TestStatus status={params.value} />
        },
        selectable: false,
    },
    {
        field: "createdAt",
        headerName: "Created on",
        flex: 1, // Adjusted to flex to take remaining space
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        renderCell: (params) => {
            return <span>{formatDate(params?.value)}</span>
        },
        selectable: false,
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 80, // Fixed width for the actions column
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            const dispatch = useDispatch();
            return (
                <div>
                    <Delete
                        style={{ cursor: 'pointer', color: "#EF4444" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setDeleteId(params?.row?.id));
                            handleOpenDialogDel();
                        }}
                    />
                </div>
            );
        },
    }
]);
