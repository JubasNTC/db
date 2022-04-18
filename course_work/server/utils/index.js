'use strict';

const asyncHandler = (fn) => (req, res, next) => {
  const fnReturn = fn(req, res, next);

  return fnReturn instanceof Promise ? fnReturn.catch(next) : fnReturn;
};

module.exports = { asyncHandler };
