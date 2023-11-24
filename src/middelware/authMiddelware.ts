import { ExpressMiddlewareInterface } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { CustomJwtPayload } from '../interfaces/responseInterfaces';
import { getUserDetails, readData } from '../utils';
import { User } from '../dto/user.dto';

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): void {
        const token = request.headers.authorization;
        //console.log(authHeader)

        if (!token) {
            return response.status(401).send({ message: 'No authorization token provided' });
        }

        try {
            const decoded = jwt.verify(token, 'access-token-secret') as CustomJwtPayload;
            // Attach user information to request
            getUserDetails(decoded.username).then((userDetails) => {
                request.user = userDetails
                next();
            });

        } catch (error) {
            return response.status(401).send({ message: 'Unauthorized: Invalid token' });
        }
    }
}