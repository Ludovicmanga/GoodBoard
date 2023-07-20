export var secretKey = "my-big-secret-mouhahahaha";
export var websiteUrl = process.env.NODE_ENV === "production" ? "https://goodboard-app.herokuapp.com" : "http://localhost:8080";
import jwt from 'jsonwebtoken';
export function generateJwtToken(boardId, secret) {
    return jwt.sign({ boardId: boardId }, secret, { expiresIn: '1d' });
}
export function verifyJwtToken(token, secret) {
    try {
        var boardId = jwt.verify(token, secret);
        return boardId;
    }
    catch (error) {
        console.log(error, ' is the invalid token error');
    }
}
