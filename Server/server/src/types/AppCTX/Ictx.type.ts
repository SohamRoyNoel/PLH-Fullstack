import { Request, Response } from "express";

export interface IctxType {
      req: Request,
      res: Response
}