import * as express from "express";

declare namespace Express {
    export interface Request{
        user: { email:string, id: string };
    }
}