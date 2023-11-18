import { User } from "../dto/user.dto";

export interface RegisterUserResponse {
    status: string;
    data: Pick<User, 'id' | 'name'>;
}