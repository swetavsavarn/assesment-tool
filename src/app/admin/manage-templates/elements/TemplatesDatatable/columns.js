import moment from "moment";
import { Delete } from "@mui/icons-material";
import { formatDate } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteId } from "@/store/features/common";
import Button from "@/components/atoms/Button";
import { setTemplateId } from "@/store/features/templates";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menu, MenuItem } from "@mui/material";
import { ENDPOINTS } from "@/store/endpoints";
import { setLoading } from "@/store/features/alerts";
import { userAuthSelector } from "@/store/features/userAuth/selectors";
import useSnackbar from "@/hooks/useSnakbar";
import { authTokenSelector } from "@/store/features/auth/selectors";
import TemplateActions from "../TemplateActions";


export const columns = ({ handleOpenDialogDel, handleOpenUseTemplateDialog, handleOpenEditTemplate }) => ([
    {
        field: "candidateJobPosition",
        headerName: "Position",
        flex: 2, // Occupies 2x proportion of the remaining space
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        selectable: false,
    },
    {
        field: "totalDuration",
        headerName: "Duration",
        flex: 1, // Occupies 1x proportion of the remaining space
        disableColumnMenu: true,
        sortable: false,
        filterable: true,
        renderCell: (params) => {
            return `${params.value} Minutes`;
        },
        selectable: false,
    },
    {
        field: "createdAt",
        headerName: "Created on",
        flex: 1.5, // Slightly wider to accommodate date format
        disableColumnMenu: true,
        sortable: true,
        filterable: true,
        renderCell: (params) => {
            return <span>{formatDate(params?.value)}</span>;
        },
        selectable: false,
    },
    {
        field: "actions",
        headerName: "Actions",
        flex: 2, // Wide enough for buttons and icons
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
            return <TemplateActions params={params} handleOpenDialogDel={handleOpenDialogDel} handleOpenUseTemplateDialog={handleOpenUseTemplateDialog} handleOpenEditTemplate={handleOpenEditTemplate} />
        },
    },
]);
