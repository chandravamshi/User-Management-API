"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_dto_1 = require("../dto/user.dto");
const jwt = __importStar(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
const validationErrors_1 = require("../middelware/validationErrors");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
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
    register(user, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userService.registerUser(user);
                // send the created user (excluding the password)
                const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
                return response.status(200).send({
                    status: "success",
                    data: userWithoutPassword,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(user, response) {
        return __awaiter(this, void 0, void 0, function* () {
            // Authenticate user.I am using 'access-token-secret' as secret to decode
            try {
                const accessToken = jwt.sign({ username: user.name }, 'access-token-secret', { expiresIn: '15m' });
                const refreshToken = jwt.sign({ username: user.name }, 'refresh-token-secret', { expiresIn: '7d' });
                // Save refreshToken with user and return tokens
                return response.status(200).send({
                    status: "success",
                    data: {
                        accessToken,
                        refreshToken,
                    }
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Post)('/register'),
    (0, routing_controllers_1.UseAfter)(validationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.Body)({
        validate: {
            validationError: { target: true, value: false },
        },
    })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)('/login'),
    (0, routing_controllers_1.UseAfter)(validationErrors_1.ValidationErrors),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/user"),
    __metadata("design:paramtypes", [userService_1.UserService])
], UserController);
