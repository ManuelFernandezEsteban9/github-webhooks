import { NextFunction, Request, Response } from "express";
import * as crypto from 'crypto';
import { envs } from "../../config";


const WEBHOOK_SECRET: string = envs.SECRET_TOKEN;

const verifySignature = (req: Request) => {

    try {
        const signature = crypto
            .createHmac("sha256", WEBHOOK_SECRET)
            .update(JSON.stringify(req.body))
            .digest('hex');

        const xHubSignature = req.header('x-hub-signature-256') ?? '';

        let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
        let untrusted = Buffer.from(xHubSignature, 'ascii');
        return crypto.timingSafeEqual(trusted, untrusted);
    } catch (error) {
        return false
    }


}



export class GitHubSha256Middleware {

    static verifySignature = async (req: Request, res: Response, next: NextFunction) => {

        if (!verifySignature(req)) {
            res.status(401).send('unauthorized');
            return
        }

        next();
    }
}

