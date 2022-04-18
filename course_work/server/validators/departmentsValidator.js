const yup = require('yup');

const departmentSchema = yup
  .object({
    name: yup.string().max(100).required(),
  })
  .noUnknown(true);

module.exports = { departmentSchema };
