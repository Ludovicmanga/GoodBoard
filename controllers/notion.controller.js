var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Client } from "@notionhq/client";
import fetch from "node-fetch";
import { OAuth } from "oauth";
import userModel from "../models/user.model";
export var websiteUrl = process.env.NODE_ENV === "production"
    ? "https://goodboard-app.herokuapp.com"
    : "http://localhost:8080";
export var searchNotion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var notion, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                notion = new Client({
                    auth: "secret_jtmhIi9fcWbliYPeMBkdkTsQNUEuuMtwVXDi1GZN2s8"
                });
                return [4 /*yield*/, notion.search()];
            case 1:
                response = _a.sent();
                console.log(res, " is the res");
                res.send(response);
                return [2 /*return*/];
        }
    });
}); };
/* export const createTrelloCard = async (req, res) => {
  const response = await fetch('https://api.trello.com/1/members/me/boards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  const json = await response.text();
  res.send(json);
} */
export var createTrelloCard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boardId, title, description, data, createCard, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                boardId = "6284d2fa63fcfc6011f51a56";
                title = "hello";
                description = "this is good";
                data = {
                    name: "SOPII JTM TROP BB <3",
                    desc: "LOOVE"
                };
                return [4 /*yield*/, fetch("https://api.trello.com/1/cards?idList=63f9d964c5377bfa7e5d4fd6&key=fcb34c61471e26df9884227677c4682e&token=ATTAce19f202dde1877db891fca2ce329fc3a460770e8a967052bffe6c70bef1bdf8DC9D5940", {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })];
            case 1:
                createCard = _c.sent();
                /*   const list = await fetch(`https://api.trello.com/1/members/me/boards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&lists=open`, {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
                });
                res.send(await list.text())  */
                // Create the card on the board
                /*     const createCardResponse = await fetch(`https://api.trello.com/1/cards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&name=${title}&desc=${description}&idList=${boardId}`, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json'
                    }
                  });
                  const createCardData = await createCardResponse.json(); */
                // Retrieve the created card data
                /*     const getCardResponse = await fetch(`https://api.trello.com/1/cards/${createCardData.id}?key=YOUR_API_KEY&token=YOUR_TOKEN`, {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json'
                    }
                  });
                  const getCardData = await getCardResponse.json();  */
                /*     res.send(getCardData);
                } catch (err) {
                  console.error(err);
                  res.status(500).send('Error creating Trello card');
                } */
                _b = (_a = res).send;
                return [4 /*yield*/, createCard.text()];
            case 2:
                /*   const list = await fetch(`https://api.trello.com/1/members/me/boards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&lists=open`, {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
                });
                res.send(await list.text())  */
                // Create the card on the board
                /*     const createCardResponse = await fetch(`https://api.trello.com/1/cards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&name=${title}&desc=${description}&idList=${boardId}`, {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json'
                    }
                  });
                  const createCardData = await createCardResponse.json(); */
                // Retrieve the created card data
                /*     const getCardResponse = await fetch(`https://api.trello.com/1/cards/${createCardData.id}?key=YOUR_API_KEY&token=YOUR_TOKEN`, {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json'
                    }
                  });
                  const getCardData = await getCardResponse.json();  */
                /*     res.send(getCardData);
                } catch (err) {
                  console.error(err);
                  res.status(500).send('Error creating Trello card');
                } */
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
export var getOauthTrello = function () { };
var requestURL = "https://trello.com/1/OAuthGetRequestToken";
var accessURL = "https://trello.com/1/OAuthGetAccessToken";
var authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
var appName = "GoodBoard ";
var scope = "read,write";
var expiration = "1hour";
var key = "fcb34c61471e26df9884227677c4682e";
var secret = "d4cad85ff4c87dbc8fbc275831ad42f2fe6b9ec8fd83bb9316ad8b6e9dd7debd";
var loginCallback = "".concat(websiteUrl, "/api/integration/setOauthCodeTrello");
var oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");
var oauth_secrets = {};
export var loginTrello = function (request, response) {
    oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
        oauth_secrets[token] = tokenSecret;
        console.log("".concat(authorizeURL, "?oauth_token=").concat(token, "&name=").concat(appName, "&scope=").concat(scope, "&expiration=").concat(expiration), " is the url");
        response.send("".concat(authorizeURL, "?oauth_token=").concat(token, "&name=").concat(appName, "&scope=").concat(scope, "&expiration=").concat(expiration));
    });
};
var token, tokenSecret;
export var setOauthCodeTrello = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, tokenSecret, verifier;
    return __generator(this, function (_a) {
        token = req.query.oauth_token;
        tokenSecret = oauth_secrets[token];
        verifier = req.query.oauth_verifier;
        oauth.getOAuthAccessToken(token, tokenSecret, verifier, function (error, accessToken, accessTokenSecret, results) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // In a real app, the accessToken and accessTokenSecret should be stored
                    console.log(accessToken, " is access and secret is ", accessTokenSecret);
                    oauth.getProtectedResource("https://api.trello.com/1/members/me/boards", "GET", accessToken, accessTokenSecret, function (error, data, response) {
                        return __awaiter(this, void 0, void 0, function () {
                            var updatedUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, userModel.findOneAndUpdate({ _id: req.user.id }, {
                                            trelloAccessToken: accessToken,
                                            trelloAccessTokenSecret: accessTokenSecret
                                        }, { "new": true })];
                                    case 1:
                                        updatedUser = _a.sent();
                                        res.send("<script>window.close()</script>");
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
                });
            });
        });
        return [2 /*return*/];
    });
}); };
export var checkTrelloAuth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.user.trelloAccessToken) {
            res.send(true);
        }
        return [2 /*return*/];
    });
}); };
export var getTrelloBoards = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userModel.findById(req.user.id)];
            case 1:
                user = _a.sent();
                oauth.getProtectedResource("https://api.trello.com/1/members/me/boards?lists=open", "GET", user.trelloAccessToken, user.trelloAccessTokenSecret, function (error, data, response) {
                    res.send(data);
                });
                return [2 /*return*/];
        }
    });
}); };
export var createTrelloCards = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, listIds, cardTitle, cardDescription, _i, listIds_1, listId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, userModel.findById(req.user.id)];
            case 1:
                user = _b.sent();
                _a = req.body, listIds = _a.listIds, cardTitle = _a.cardTitle, cardDescription = _a.cardDescription;
                for (_i = 0, listIds_1 = listIds; _i < listIds_1.length; _i++) {
                    listId = listIds_1[_i];
                    oauth.getProtectedResource("https://api.trello.com/1/cards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&name=".concat(cardTitle, "&desc=").concat(cardDescription, "&idList=").concat(listId), "POST", user.trelloAccessToken, user.trelloAccessTokenSecret, function (error, data, response) {
                        console.log(data, ' is the data');
                    });
                }
                res.send('ok');
                return [2 /*return*/];
        }
    });
}); };
