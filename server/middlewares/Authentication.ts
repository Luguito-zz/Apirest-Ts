import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


let verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const headerAuth = req.headers['authorization'];
    if (typeof headerAuth !== 'undefined') {
        const headerToken = headerAuth.split(' ');
        const finalToken = headerToken[1];
        const token = finalToken;

        JWT.verify(token, 'seed', (err, decoded) => {
            if (err) {
                res.status(400).json({err: {messague: 'Introduce un token valido'}})
            }
            next();
        })
    }
}

export default verifyToken;