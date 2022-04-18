const yup = require('yup');

const projectSchema = yup
  .object({
    name: yup.string().max(200).required(),
    cost: yup.number().positive().required(),
    startDate: yup.date().required(),
    planedEndDate: yup.date().required(),
    realEndDate: yup.date().required(),
    Department: yup.object({
      name: yup
        .string()
        .transform((value) => String(value).toUpperCase())
        .required(),
    }),
  })
  .noUnknown(true);

module.exports = { projectSchema };
