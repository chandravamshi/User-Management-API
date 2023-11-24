import { JwtPayload } from "jsonwebtoken";
import { User } from "../dto/user.dto";
import { VehiclePreference } from "../dto/userVechilePreference.dto";

export interface RegisterUserResponse {
    status: string;
    data: Pick<User, 'id' | 'name'>;
}

export interface LoginUserResponse {
    status: string;
    data: {
        accessToken: string;
        refreshToken: string;
    }
}
export interface AddUserPreferenceResponse {
    status: string;
    data: VehiclePreference;
}

export interface CustomJwtPayload extends JwtPayload  {
    username: string;
}