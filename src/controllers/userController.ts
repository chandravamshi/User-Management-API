import { Request, Response } from 'express';
import { Body, JsonController, Post, Res, UseAfter, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { User } from "../dto/user.dto";
import * as jwt from 'jsonwebtoken';
import { UserService } from "../services/userService";
import { AuthMiddleware } from "../middelware/authMiddelware";
import { ValidationErrors } from "../middelware/validationErrors";
import { RegisterUserResponse } from '../interfaces/responseInterfaces';




@Service()
@JsonController("/user")
export class UserController {
  constructor(private userService: UserService) { }


/**
 * @api {post} /user/register Register User
 * @apiName RegisterUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Registers a new user in the system.
 *
 * @apiParam {String} name User's name.
 * @apiParam {String} password User's password.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "John Doe",
 *       "password": "StrongPass123!"
 *     }
 *
 * @apiSuccess {String} status Success status.
 * @apiSuccess {Object} data User data.
 * @apiSuccess {Number} data.id User's id.
 * @apiSuccess {String} data.name User's name.
 *
 * @apiError UserAlreadyExists The username already exists in the system.
 * @apiError ValidationError Validation error occurred due to invalid input.
 * @apiErrorExample {json} Error-Response-Validation:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Validation errors",
 *       "errors": [
 *          {
 *             "property": "name",
 *             "constraints": {
 *                 "isNotEmpty": "name should not be empty",
 *                 "isString": "name must be a string"
 *             }
 *          },
 *          {
 *             "property": "password",
 *             "constraints": {
 *                 "isNotEmpty": "password should not be empty",
 *                 "isString": "password must be a string",
 *                 "length": "password must be longer than or equal to 8 characters",
 *                 "matches": "Weak Password. Must include upper and lower case letters, numbers, and symbols."
 *             }
 *          }
 *       ]
 *     }
 * @apiErrorExample {json} Error-Response-UserAlreadyExists:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "error",
 *       "message": "User already exists"
 *     }
 */
  @Post('/register')
  @UseAfter(ValidationErrors)
  async register(@Body({
    validate: {
      validationError: { target: true, value: false },
    },
  }) user: User, @Res() response: Response<RegisterUserResponse>):Promise<Response>  {

    try {
      const newUser = await this.userService.registerUser(user);
      // send the created user (excluding the password)
      const { password, ...userWithoutPassword } = newUser;
      return response.status(200).send({
        status: "success",
        data: userWithoutPassword,
      });
      
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  @UseBefore(AuthMiddleware)
  @UseAfter(ValidationErrors)
  async login(@Body({
    validate: {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
    },
  }) user: User) {
    // Authenticate user
    const accessToken = jwt.sign({ userId: user.id }, 'access-token-secret', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, 'refresh-token-secret', { expiresIn: '7d' });
    // Save refreshToken with user and return tokens
  }
}