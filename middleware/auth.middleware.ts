import { NextFunction } from "express";

export const checkAuthenticated = async (
    req: any,
    res: Response,
    next: NextFunction,
  ) => {
    if (req.isAuthenticated()) {
        console.log('I am authenticated')
        next();
    } else {
        console.log('I am not authenticated user is ', req.user)
    }
  }