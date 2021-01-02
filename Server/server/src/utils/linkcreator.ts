import { sign, verify } from "jsonwebtoken";

/**
 * Create a URl that will be passed for App Request accepter mutation for Admin
 * will be passed by mail
 */
export function createUrlToAcceptApplicationRequest(reqid: number, reqappname: string, reqstatus: string, requestby: number, cntr: number): string{
    let createAJWT = sign({
        reqId: reqid,
        reqAppName: reqappname,
        reqStatus: reqstatus,
        requestedBy: requestby,
        counter: cntr
    },
        process.env.MAILER_TOKEN_SECRET!,
    {
        expiresIn: process.env.MAIL_TOKEN_EXPIRES_IN!
    });

    let createURL = process.env.MAIL_SENDER_URL! + process.env.MAIL_SENDER_SUFFIX_APP_REQUEST! + createAJWT;

    return createURL;
}

export function createUrlToAcceptApplicationRequestDecoder(token: string){
    let payload = verify(token, process.env.MAILER_TOKEN_SECRET!);
    return payload;
}