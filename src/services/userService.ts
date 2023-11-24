import { User } from "../dto/user.dto";
import { Service } from "typedi";
import * as bcrypt from 'bcrypt';
import { readData, writeData } from "../utils";


@Service()
export class UserService {

    async registerUser(newUser: User): Promise<User> {
        const users = await readData<User[]>('src/database/users.json');
        const userExists = users.find(user => user.name === newUser.name);
        if (userExists) {
            // User already exists
            throw new Error('User already exists');
        }
        // Hash the password 
        try {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            // Assign an ID and store the user  
            newUser.id = users.length + 1;
            users.push(newUser);
            await writeData('src/database/users.json', users);
            return newUser;
        } catch (error) {
            throw error
        }
    }
}