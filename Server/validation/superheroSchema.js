const yup = require("yup");

const SUPERHERO_CREATION_SCHEMA = yup.object().shape({
  nickname: yup
    .string()
    .matches(
      /^[A-Z][a-z]{0,32}$/,
      "Nickname must start with an uppercase letter and contain up to 32 lowercase letters."
    )
    .required("Nickname is required."),
  realName: yup
    .string()
    .matches(
      /^[A-Z][a-z]{0,32}$/,
      "Real name must start with an uppercase letter and contain up to 32 lowercase letters."
    )
    .required("Real name is required."),
  originDescription: yup.string().required("Origin description is required."),
  catchPhrase: yup.string().required("Catch phrase is required."),
});

module.exports.SUPERHERO_CREATION_SCHEMA = SUPERHERO_CREATION_SCHEMA;
