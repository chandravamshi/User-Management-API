import { User } from "../dto/user.dto";
import { Service } from "typedi";
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


@Service()
export class UserService {

    async registerUser(newUser: User): Promise<User> {
        const users = await this.readUsers();
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
            await this.writeUsers(users);
            return newUser;
        } catch (error) {
            throw error
        }

    }

    async readUsers(): Promise<User[]> {
        try {
            const data = await readFile('src/database/users.json', 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading file:', err);
            // return [];
            throw err
        }
    }

    async writeUsers(users: User[]): Promise<void> {
        try {
            const data = JSON.stringify(users, null, 2);
            await writeFile('src/database/users.json', data, 'utf8');
        } catch (err) {
            console.error('Error writing file:', err);
            throw err
        }
    }

}