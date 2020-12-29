import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { IctxType } from '../types/AppCTX/Ictx.type';

export const IsAuthMiddleware: MiddlewareFn<IctxType> = ({ context }, next) => {

      const authorization = context.req.headers['authorization']
      
      if(!authorization) { throw new Error('User is unauthorized'); }

      if(authorization.split(' ')[0] !== 'Chernobyl'){
            throw new Error('Invalid Request');
      }
      try {
            const token = authorization.split(' ')[1];
            const payload = verify(token, process.env.ACCESS_JWT_SECRET!);
            /**
             * Assign the payload value to Context payload
             * To access it from any GQL query/ middleware
             */
            context.payload = payload as any;
      } catch (error) {
            console.log("Access denied");
            throw new Error('User is unauthorized');
      }

      return next();
}