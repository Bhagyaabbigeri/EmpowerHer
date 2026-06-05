import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, Result, ValidationError } from 'express-validator';

export interface ValidationError {
  message: string;
  field?: string;
}

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err: ValidationError) => ({
        message: err.msg,
        field: err.param,
      })),
    });
  }
  
  next();
};

// Helper function to run validations in sequence
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    res.status(400).json({
      success: false,
      errors: errors.array().map((err: ValidationError) => ({
        message: err.msg,
        field: err.param,
      })),
    });
  };
};
