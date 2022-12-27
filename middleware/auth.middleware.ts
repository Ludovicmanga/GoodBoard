import { NextFunction } from "express";

export const checkAuthenticated = async (
    req,
    res,
    next: NextFunction,
  ) => {
    if (req.isAuthenticated()) {
        console.log('I am authenticated')
        next();
    } else {
        console.log('I am not authenticated user is ', req.user, ' session is ', req.session)
        next();
    }
  }