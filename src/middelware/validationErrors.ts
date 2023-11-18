import { json } from "body-parser";
import { ValidationError } from "class-validator";
import {
    ExpressErrorMiddlewareInterface, HttpError, JsonController
} from "routing-controllers";
import { Service } from "typedi";

@Service()
export class ValidationErrors implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any, next: (err?: any) => any) {
        if (error) {
            if (error.httpCode === 400 && error.errors instanceof Array && error.errors.every((err: any) => err instanceof ValidationError)) {
                // Format validation errors
                const validationErrors = error.errors as ValidationError[];
                const clientErrors = validationErrors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));
                response.status(400).send({
                    message: 'Validation errors',
                    errors: clientErrors
                });
            } else {
                // Generic error response
                response.status(error.httpCode || 500).send({
                    status:'error',
                    message: error.message || 'Something went wrong'
                });
            }
        } else {
            // Non HttpError related errors
            response.status(500).send({
                status:'error',
                message: 'Internal Server Error'
            });
        }
    }
}
