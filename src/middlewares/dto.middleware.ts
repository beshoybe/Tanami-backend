import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors = await validate(dtoInstance, {
      whitelist: true,             // ✅ Removes unknown fields
      forbidNonWhitelisted: true,  // ✅ Throws an error if unknown fields exist
    });

    if (errors.length > 0) {
      // Check if error contains "whitelistValidation" constraint (indicating unknown fields)
      const unknownFieldError = errors.find((error) =>
        error.constraints?.whitelistValidation
      );

      if (unknownFieldError) {
         res.status(400).json({
          message: req.t
            ? req.t("validation.unknown_field", { field: unknownFieldError.property })
            : `Unknown field '${unknownFieldError.property}' is not allowed`,
        });
        return
      }

       res.status(400).json({
        errors: errors.map((error) => ({
          property: error.property,
          messages: Object.values(error.constraints || {}).map((msg) =>
            req.t ? req.t(msg) : msg // ✅ Supports translations
          ),
        })),
      });
      return
    }

    req.body = dtoInstance; // ✅ Overwrites `req.body` with validated DTO
    next(); // ✅ Moves to the next middleware
  };
}
