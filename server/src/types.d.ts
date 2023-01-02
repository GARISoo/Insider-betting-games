import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'

export type User = {
    _id: Types.ObjectId
    roles?: {
        Admin?: number
        User?: number
    }
    token: string
    username: string
    name: string
    surname: string
}


declare global {
    namespace Express {
        interface Request {
            user: User | undefined
        }
    }
}

export type TokenFunction = (req: Request, res: Response) => string;
export type TokenObject = { [key in keyof Request]: TokenFunction };

export type RouterHandler = (req: Request, res: Response) => void;

export type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void;

export type Roles = 'Admin' | 'User';

export type JwtError = JsonWebTokenError | TokenExpiredError | NotBeforeError | null | string;