import { body, validationResult } from 'express-validator';

// Define validation rules
const productValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('qty')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer'),
    body('picture').notEmpty().withMessage('Picture is required'),
    body('expired_at')
      .isISO8601()
      .withMessage('ExpiredAt must be a valid date in the format YYYY-MM-DD'),
  ];
};

// Middleware to handle validation errors
const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: any = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { productValidationRules, validate };
