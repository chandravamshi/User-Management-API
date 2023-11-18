import { ExpressMiddlewareInterface } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any): void {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).send({ message: 'No authorization token provided' });
        }

        const token = authHeader.split(' ')[1]; // Expecting "Bearer TOKEN"

        try {
            const decoded = jwt.verify(token, 'access-token-secret');
            request.user = decoded; // Attach user information to request
            next();
        } catch (error) {
            return response.status(401).send({ message: 'Unauthorized: Invalid token' });
        }
    }
}
