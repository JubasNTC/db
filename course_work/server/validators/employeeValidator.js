const yup = require('yup');

const employeeSchema = yup
  .object({
    lastName: yup.string().max(100).required(),
    middleName: yup.string().max(100).required(),
    firstName: yup.string().max(100).required(),
    position: yup.string().max(100).required(),
    salary: yup.number().positive().required(),
  })
  .noUnknown(true);

module.exports = { employeeSchema };
