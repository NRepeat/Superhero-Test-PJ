

const SUPERPOWER_CREATION_SCHEMA = yup.object().shape({
    superpower: yup
    .array()
    .of(yup.string().required('Superpower element must be a non-empty string.'))
    .required('Superpower array is required.')
    .min(1, 'Superpower array must contain at least one element.'),
})


module.exports.SUPERPOWER_CREATION_SCHEMA = SUPERPOWER_CREATION_SCHEMA