"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserVechilePrefrenceService = void 0;
const typedi_1 = require("typedi");
const utils_1 = require("../utils");
let UserVechilePrefrenceService = class UserVechilePrefrenceService {
    addVehiclePreference(userId, vehiclePreferenceData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const preferences = yield (0, utils_1.readData)('src/database/users_vechile_preferences.json');
                const newPreference = Object.assign({ id: Date.now(), userId }, vehiclePreferenceData);
                preferences.push(newPreference);
                yield (0, utils_1.writeData)('src/database/users_vechile_preferences.json', preferences);
                return newPreference;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateVehiclePreference(vehicleId, vehiclePreferenceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferences = yield (0, utils_1.readData)('src/database/users_vechile_preferences.json');
            ;
            const index = preferences.findIndex(v => v.id === vehicleId);
            if (index !== -1) {
                preferences[index] = Object.assign(Object.assign({}, preferences[index]), vehiclePreferenceData);
                yield (0, utils_1.writeData)('src/database/users_vechile_preferences.json', preferences);
                return preferences[index];
            }
            else {
                throw new Error('Vehicle preference not found');
            }
        });
    }
    deleteVehiclePreference(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let preferences = yield (0, utils_1.readData)('src/database/users_vechile_preferences.json');
                const preferenceIndex = preferences.findIndex(p => p.id === vehicleId);
                if (preferenceIndex !== -1) {
                    preferences = preferences.filter((_, index) => index !== preferenceIndex);
                    yield (0, utils_1.writeData)('src/database/users_vechile_preferences.json', preferences);
                    return preferenceIndex;
                }
                else {
                    throw new Error('Vehicle preference not found');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.UserVechilePrefrenceService = UserVechilePrefrenceService;
exports.UserVechilePrefrenceService = UserVechilePrefrenceService = __decorate([
    (0, typedi_1.Service)()
], UserVechilePrefrenceService);
