import * as Yup from "yup"; // Yup validation


export const editTemplateValidationSchema = (programSkillLevelPairs) => {
    return Yup.object().shape({
        candidateJobPosition: Yup.string()
            .required('Job Position is required')
            .min(3, 'Job Position must be at least 3 characters long')
            .max(30, 'Job Position must not exceed 30 characters'),
        totalDuration: Yup.number()
            .typeError('Please enter a valid number for duration')
            .required('Duration is required')
            .moreThan(0, 'Duration must be greater than 0'),
        programCount: Yup.number()
            .typeError('Please enter a valid number for program count')
            .when([], {
                is: () => programSkillLevelPairs?.length > 0,
                then: (schema) =>
                    schema.required('Program count is required').moreThan(0, 'Program count must be greater than 0'),
                otherwise: (schema) => schema.notRequired(),
            }),
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
