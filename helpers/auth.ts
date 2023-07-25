
export const secretKey = "my-big-secret-mouhahahaha";
export const websiteUrl = process.env.NODE_ENV === "production" ? "https://goodboard-app.herokuapp.com" : "http://localhost:8080"
import jwt from 'jsonwebtoken';

export function generateJwtToken(boardId: string, secret: string): string {
return jwt.sign({ boardId }, secret, { expiresIn: '1d' });
}
  
export function verifyJwtToken(token: string, secret: string) {
    try {
        const boardId = jwt.verify(token, secret);
        return boardId;
    } catch (error) {
        console.log(error, ' is the invalid token error')
    }
}

export const logUserIn = (userToLog, req, res) => {
    req.login(userToLog, async err => {
      if (err) {
        console.log(err, ' is the err');
      } else {
        res.json({ user: userToLog });
      }
    });
  }
