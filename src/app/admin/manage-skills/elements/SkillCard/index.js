import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { Menu, MenuItem, IconButton, FormControlLabel } from "@mui/material";
import { Checkbox } from '@mui/material';

const SkillCard = ({ id, title, levels, onEdit, onDelete, selected, showOptions = true, onClick, checkboxSelection }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            className={`bg-primary-300 text-white min-h-[100px] rounded-md p-4 
                 transition-transform duration-200 hover:shadow-lg border border-primary-400 ${checkboxSelection ? "hover:scale-105 cursor-pointer" : ""}`}
            onClick={() => onClick(id)}
        >
            <div className="flex mb-4 justify-between items-start">
                <h2 className="text-blue-400 text-xl font-semibold text-left break-all">{title}</h2>
                {!checkboxSelection && <IconButton
                    aria-controls="skill-card-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    size="small"
                >
                    <MoreVertIcon style={{ color: "white" }} />
                </IconButton>}
                {checkboxSelection && <FormControlLabel
                    control={
                        <Checkbox
                            // name={getSkillName(skill.name)}
                            checked={selected}
                            // onChange={handleCheckboxChange}
                            sx={{ color: 'white' }}
                        />
                    }
                // label={getSkillName(skill)}
                />}
                {/* Menu */}
                <Menu
                    id="skill-card-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#0E1626", // Dark navy background
                            color: "white",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
                            borderRadius: "8px",
                            padding: "8px 0",
                            width: "130px"
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            onEdit(id);
                            handleMenuClose();
                        }}
                        sx={{
                            color: "white",
                            fontSize: "1rem",
                            // padding: "10px 16px",
                            '&:hover': {
                                color: "#8C52FF", // Purple hover effect for Edit
                            },
                        }}
                    >
                        <EditIcon fontSize="small" style={{ marginRight: 8 }} />
                        Edit
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            onDelete(id);
                            handleMenuClose();
                        }}
                        sx={{
                            color: "#EF4444 !important", // Red color for Delete
                            fontSize: "1rem",
                            // padding: "10px 16px",
                            '&:hover': {
                                backgroundColor: "rgba(255, 76, 76, 0.1)", // Subtle red background on hover
                            },
                        }}
                    >
                        <DeleteIcon fontSize="small" style={{ marginRight: 8 }} />
                        Delete
                    </MenuItem>
                </Menu>
            </div>

            {/* Loop through levels */}
            <div className="mb-2 flex flex-col gap-y-2">
                {levels?.map((level, index) => (
                    <Link
                        href={checkboxSelection ? "" : `/admin/manage-questions?skill=${id}&experience=${level?.levelId}`}
                        key={index}
                        className={`${checkboxSelection ? "cursor-default" : "hover:text-blue-400 hover:scale-105 "} text-white text-sm p-2 
                       rounded-md duration-200 cursor-pointer bg-primary-200 border border-primary-400`}
                        onClick={(e) => {
                            if (checkboxSelection) {
                                e.preventDefault(); // Prevent navigation
                            }
                        }}
                    >
                        <strong>{level.levelName}:</strong> {level.noOfQuestions} questions
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SkillCard;