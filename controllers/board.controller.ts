import boardModel from "../models/board.model";
import boardUserRelModel from "../models/boardUserRel.model";

export const createBoard = async (req, res) => {
    if (req.user) {
        const newBoard = new boardModel({
            name: req.body.name,
            url: "https://"+req.body.name+Math.random().toString(36).slice(2)+'.goodboard.io'
        });
        newBoard
            .save()
            .catch((error) => console.log(error));

        const newBoardUserRelation = new boardUserRelModel({
            user: req.user.id,
            board: newBoard.id,
            userRole: 'company',
        });
    
        newBoardUserRelation
            .save()
            .catch((error) => console.log(error));
        res.json({
            url: newBoard.url,
        })
    } else {
        console.log('user not logged in');
    }
}