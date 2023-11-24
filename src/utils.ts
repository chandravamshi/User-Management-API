import * as fs from 'fs';
import * as util from 'util';
import { User } from './dto/user.dto';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export async function readData<T>(filePath: string): Promise<T> {
    try {
        const data = await readFile(filePath, 'utf8');
        return JSON.parse(data) as T;
    } catch (err) {
        console.error('Error reading file:', err);
        throw err
    }
}

export async function writeData<T>(filePath: string, data: T): Promise<void> {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await writeFile(filePath, jsonData, 'utf8');
    } catch (err) {
        console.error('Error writing file:', err);
        throw err
    }
}

export async function getUserDetails(userName:string):Promise<User| undefined>{
    const users = await readData<User[]>('src/database/users.json');
    const user = users.find(user => user.name === userName);
    return user

}