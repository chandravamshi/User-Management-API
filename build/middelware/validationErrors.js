"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrors = void 0;
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
let ValidationErrors = class ValidationErrors {
    error(error, request, response, next) {
        if (error) {
            if (error.httpCode === 400 && error.errors instanceof Array && error.errors.every((err) => err instanceof class_validator_1.ValidationError)) {
                // Format validation errors
                const validationErrors = error.errors;
                const clientErrors = validationErrors.map(err => ({
                    property: err.property,
                    constraints: err.constraints
                }));
                response.status(400).send({
                    message: 'Validation errors',
                    errors: clientErrors
                });
            }
            else {
                // Generic error response
                response.status(error.httpCode || 500).send({
                    status: 'error',
                    message: error.message || 'Something went wrong'
                });
            }
        }
        else {
            // Non HttpError related errors
            response.status(500).send({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
};
exports.ValidationErrors = ValidationErrors;
exports.ValidationErrors = ValidationErrors = __decorate([
    (0, typedi_1.Service)()
], ValidationErrors);
