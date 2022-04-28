"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config({ path: '../config/.env' });
const PORT = process.env.PORT || 2000;
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port ${PORT}`);
});
