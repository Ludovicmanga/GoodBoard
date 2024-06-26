export const secretKey = "my-big-secret-mouhahahaha";
export const websiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://goodboard-app-41de944b1f08.herokuapp.com"
    : "http://localhost:8080";
import jwt from "jsonwebtoken";
import { User } from "../client/src/helpers/types";

export function generateJwtToken(boardId: string, secret: string): string {
  return jwt.sign({ boardId }, secret, { expiresIn: "1d" });
}

export function verifyJwtToken(token: string, secret: string) {
  try {
    const boardId = jwt.verify(token, secret);
    return boardId;
  } catch (error) {
    console.log(error, " is the invalid token error");
  }
}
