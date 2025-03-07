import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup validation
import { editItemSelector } from "@/store/features/common/selectors";
import { useSelector } from "react-redux";
import Button from "@/components/atoms/Button";

const AddEditSkillDialog = ({
  openDialog,
  handleCloseDialog,
  handleSaveSkill,
  editIndex,
}) => {
  // Formik initialization with validation schema

  const editItem = useSelector(editItemSelector);

  const formik = useFormik({
    initialValues: {
      skillName: editItem?.title || editItem?.skillName || "", // Initial value for the skill name
    },
    validationSchema: Yup.object({
      skillName: Yup.string()
        .required("Skill name is required") // Skill name is required
        .min(3, "Skill name must be at least 3 characters") // Minimum length is 3 characters
        .max(50, "Skill name can't be longer than 50 characters"), // Maximum length is 50 characters
    }),
    onSubmit: (values) => {

      // Call the save function with form values
      handleSaveSkill(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("skillName", editItem?.name || editItem?.skillName || "")


  }, [editItem, openDialog])

  useEffect(() => {
    if (!openDialog) {
      formik?.resetForm()
    }

  }, [openDialog])

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#1E293B", // Custom background color
          width: 400, // Set a fixed width for the dialog
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {editItem ? "Edit Skill" : "Add New Skill"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px !important" }}>
          {/* Skill Name Input */}
          <TextField
            fullWidth
            label="Skill Name"
            name="skillName"
            value={formik.values.skillName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.skillName && Boolean(formik.errors.skillName)}
            helperText={formik.touched.skillName && formik.errors.skillName}
            sx={{
              marginBottom: 2, // Add space between input and button
              "& .MuiInputBase-root": {
                width: "100%", // Ensure the input is 100% width
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="secondary"
            size="small"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary "
            // onClick={formik.handleSubmit} // Trigger form submit
            size="small"
          >
            {!editItem ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditSkillDialog;
