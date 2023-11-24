import { Service } from "typedi";
import { User } from "../dto/user.dto";
import { VehiclePreference } from "../dto/userVechilePreference.dto";
import { readData, writeData } from "../utils";



@Service()
export class UserVechilePrefrenceService {

    async addVehiclePreference(userId: Pick<User, 'id'>, vehiclePreferenceData: Omit<VehiclePreference, 'id' | 'userId'>): Promise<VehiclePreference> {
        try {
            const preferences = await readData<VehiclePreference[]>('src/database/users_vechile_preferences.json');
            const newPreference: VehiclePreference = { id: Date.now(), userId, ...vehiclePreferenceData };
            preferences.push(newPreference);
            await writeData('src/database/users_vechile_preferences.json', preferences);
            return newPreference;
        } catch (error) {
            throw error
        }

    }

    async updateVehiclePreference(vehicleId: number, vehiclePreferenceData: Omit<VehiclePreference, 'id' | 'userId'>) {
        const preferences = await readData<VehiclePreference[]>('src/database/users_vechile_preferences.json');;
        const index = preferences.findIndex(v => v.id === vehicleId);
        if (index !== -1) {
            preferences[index] = { ...preferences[index], ...vehiclePreferenceData };
            await writeData('src/database/users_vechile_preferences.json', preferences);
            return preferences[index];
        } else {
            throw new Error('Vehicle preference not found');
        }
    }

    async deleteVehiclePreference(vehicleId: number) {
        try {
            let preferences = await readData<VehiclePreference[]>('src/database/users_vechile_preferences.json');
            const preferenceIndex = preferences.findIndex(p => p.id === vehicleId);
            if (preferenceIndex !== -1) {
                preferences = preferences.filter((_, index) => index !== preferenceIndex);
                await writeData('src/database/users_vechile_preferences.json', preferences);
                return preferenceIndex
            } else {
                throw new Error('Vehicle preference not found');
            }

        } catch (error) {
            throw error
        }
    }

}