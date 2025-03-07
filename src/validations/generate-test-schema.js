import * as Yup from "yup"; // Yup validation

export const generateTestValidationSchema = (programSkillLevelPairs) => {
    return Yup.object().shape({
        candidateName: Yup.string()
            .required('Candidate name is required')
            .min(2, 'Name must be at least 2 characters long')
            .max(50, 'Name must not exceed 50 characters'),
        candidateEmail: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        totalDuration: Yup.number()
            .typeError('Please enter a valid number for duration')
            .required('Duration is required')
            .moreThan(0, 'Duration must be greater than 0'),
        programCount: Yup.number()
            .typeError('Please enter a valid number')
            .when([], {
                is: () => programSkillLevelPairs?.length > 0,
                then: (schema) =>
                    schema.required('No of coding questions is required').moreThan(0, 'No of coding questions must be greater than 0'),
                otherwise: (schema) => schema.notRequired(),
            }),
        candidateJobPosition: Yup.string()
            .required('Job Position is required')
            .min(3, 'Job Position must be at least 3 characters long')
            .max(30, 'Job Position must not exceed 30 characters'),
        skills: Yup.array()
            .of(
                Yup.object().shape({
                    skillId: Yup.string().required('Skill ID is required'),
                    levelId: Yup.string().required('Level ID is required'),
                })
            )
            .min(1, 'At least one skill must be selected'),
    });
};
