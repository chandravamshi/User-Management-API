import { Body, JsonController, Post, Req, Res, UseBefore, Param, Put, Delete, QueryParam } from "routing-controllers";
import { Service } from 'typedi';
import { AuthMiddleware } from "../middelware/authMiddelware";
import { UserVechilePrefrenceService } from "../services/userVechilePreferenceService";
import { AddUserPreferenceResponse } from "../interfaces/responseInterfaces";
import { Response } from 'express';
import { VehiclePreference } from "../dto/userVechilePreference.dto";


@Service()
@JsonController("/vechile-preferences")
export class UserVechilePreferencesController {
    constructor(private userVechilePrefrenceService: UserVechilePrefrenceService) { }


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


    @Post('/')
    @UseBefore(AuthMiddleware)
    async addVehiclePreference(@Body({
        validate: {
            validationError: { target: true, value: false },
        },
    }) vehiclePreferenceData: Omit<VehiclePreference, 'userId'>, @Req() req: any, @Res() response: Response<AddUserPreferenceResponse>): Promise<Response> {

        try {
            const user = req.user;
            const newInsertedRecord = await this.userVechilePrefrenceService.addVehiclePreference(user.id, vehiclePreferenceData);
            return response.status(200).send({
                status: "success",
                data: newInsertedRecord,
            });

        } catch (error) {
            throw error
        }
    }

    @Put('/')
    async updateVehicle(@QueryParam('preferenceId') preferenceId: number,
        @Body({validate: {
            validationError: { target: true, value: false },
        },}) vehiclePreferenceData: Omit<VehiclePreference, 'userId' | 'id'>,
        @Res() response: any) {
        try {
            const updatedData = await this.userVechilePrefrenceService.updateVehiclePreference(preferenceId, vehiclePreferenceData);
            return response.status(200).send({
                status: "success",
                data: updatedData,
            });
        } catch (error) {
            throw error
        }
    }

    @Delete('/')
    async deleteVehicle(@QueryParam('preferenceId') preferenceId: number,
        @Res() response: any) {
        try {
            const deletedPreference = await this.userVechilePrefrenceService.deleteVehiclePreference(preferenceId);
            return response.status(200).send({
                status: "success",
                data: deletedPreference,
            });

        } catch (error) {
            throw error
        }
    }

    /** 
    @Put('/:vehicleId')
    @UseBefore(AuthMiddleware)
    async updateVehiclePreference(@Body({
        validate: {
            validationError: { target: true, value: false },
        },
    }) vehiclePreference: any, @Req() req: any, @Res() response: Response): Promise<Response> {
        try {
            const user = req.user;
            return await this.userVechilePrefrenceService.updateVehiclePreference(userId, vehicleId, vehicleUpdate);


        } catch (error) {
            throw error
        }
    }

   **/
}