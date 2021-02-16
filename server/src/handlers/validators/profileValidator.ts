import {check} from "express-validator";

export const createProfileValidator = [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills are  required").not().isEmpty(),
];

export const addExperienceValidation = [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]

export const addEducationValidation = [
    check('school', 'Title is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]