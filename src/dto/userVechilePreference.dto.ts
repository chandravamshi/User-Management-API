import { IsString, IsInt, Length, Min, Max, IsNumber } from 'class-validator';
import { User } from './user.dto';

export class VehiclePreference {

    id: number; 

    @IsString()
    @Length(2, 50)
    make: string;

    @IsString()
    @Length(2, 50)
    model: string;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    year: number;

    @IsNumber()
    userId: Pick<User, 'id'>;
}
