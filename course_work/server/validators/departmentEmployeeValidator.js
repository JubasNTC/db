const yup = require('yup');

const departmentEmployeeSchema = yup
  .object({
    employeeId: yup.number().integer().positive().required(),
    departmentName: yup.string().max(100).required(),
  })
  .noUnknown(true);

module.exports = { departmentEmployeeSchema };
