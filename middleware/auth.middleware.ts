import { NextFunction } from "express";

export const checkAuthenticated = async (
    req,
    res,
    next: NextFunction,
  ) => {
    if (req.isAuthenticated()) {
        console.log('I am logged as ', req.user);
        next();
    } else {
        console.log('I am not authenticated');
    }
  }