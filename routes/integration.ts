import express from "express";
import { setOauthCodeTrello, createTrelloCard, loginTrello, searchNotion, checkTrelloAuth, getTrelloBoards, createTrelloCards } from "../controllers/notion.controller";
const router = express();

router.post('/notion', searchNotion);
router.post('/createTrelloCard', createTrelloCard);
router.post('/loginTrello', loginTrello);
router.get('/setOauthCodeTrello', setOauthCodeTrello);
router.post('/check-trello-auth', checkTrelloAuth);
router.post('/getTrelloBoards', getTrelloBoards);
router.post('/createTrelloCards', createTrelloCards);


export default router;