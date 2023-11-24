"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVechilePreferencesController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const authMiddelware_1 = require("../middelware/authMiddelware");
const userVechilePreferenceService_1 = require("../services/userVechilePreferenceService");
let UserVechilePreferencesController = class UserVechilePreferencesController {
    constructor(userVechilePrefrenceService) {
        this.userVechilePrefrenceService = userVechilePrefrenceService;
    }
    /**
    @Post('/')
    @UseBefore(AuthMiddleware)
    async insertData(@Body({
        validate: {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false, value: false },
        },
    }) data: any, @Req() req: any, @Res() response: any): Promise<any> {
        // The AuthMiddleware will attach the user object to the request after validating the token
        try {

            const user = req.user;
            // Check if the user object exists, indicating that the token is valid and the user is authenticated
            if (!user) {
                throw new Error('User is not authenticated');
            }

            // Perform the data insertion logic here

            var insertedData: any = []
            // Return a success response or the inserted data
            return response.status(200).send({
                status: "success",
                data: insertedData
            });

        } catch (error) {
            throw error
        }
    }

    **/
    addVehiclePreference(vehiclePreferenceData, req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const newInsertedRecord = yield this.userVechilePrefrenceService.addVehiclePreference(user.id, vehiclePreferenceData);
                return response.status(200).send({
                    status: "success",
                    data: newInsertedRecord,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateVehicle(preferenceId, vehiclePreferenceData, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedData = yield this.userVechilePrefrenceService.updateVehiclePreference(preferenceId, vehiclePreferenceData);
                return response.status(200).send({
                    status: "success",
                    data: updatedData,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteVehicle(preferenceId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPreference = yield this.userVechilePrefrenceService.deleteVehiclePreference(preferenceId);
                return response.status(200).send({
                    status: "success",
                    data: deletedPreference,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.UserVechilePreferencesController = UserVechilePreferencesController;
__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.UseBefore)(authMiddelware_1.AuthMiddleware),
    __param(0, (0, routing_controllers_1.Body)({
        validate: {
            validationError: { target: true, value: false },
        },
    })),
    __param(1, (0, routing_controllers_1.Req)()),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserVechilePreferencesController.prototype, "addVehiclePreference", null);
__decorate([
    (0, routing_controllers_1.Put)('/'),
    __param(0, (0, routing_controllers_1.QueryParam)('preferenceId')),
    __param(1, (0, routing_controllers_1.Body)({ validate: {
            validationError: { target: true, value: false },
        }, })),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserVechilePreferencesController.prototype, "updateVehicle", null);
__decorate([
    (0, routing_controllers_1.Delete)('/'),
    __param(0, (0, routing_controllers_1.QueryParam)('preferenceId')),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserVechilePreferencesController.prototype, "deleteVehicle", null);
exports.UserVechilePreferencesController = UserVechilePreferencesController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/vechile-preferences"),
    __metadata("design:paramtypes", [userVechilePreferenceService_1.UserVechilePrefrenceService])
], UserVechilePreferencesController);
