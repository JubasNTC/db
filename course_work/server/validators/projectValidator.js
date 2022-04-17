const yup = require('yup');

const projectSchema = yup
  .object({
    departmentId: yup.number().integer().positive().required(),
    name: yup.string().max(200).required(),
    cost: yup.number().positive().required(),
    startDate: yup.date().required(),
    planedEndDate: yup.date().required(),
    realEndDate: yup.date().required(),
  })
  .noUnknown(true);

module.exports = { projectSchema };
