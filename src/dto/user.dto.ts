import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class User {
    id: number; 

    @IsNotEmpty({ message: "name should not be empty" })
    @IsString()
    name: string;


    @IsNotEmpty({ message: "password should not be empty" })
    @IsString()
    @Length(8, 100)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Weak Password. Must include upper and lower case letters, numbers, and symbols.',
    })
    password: string;
}
