import { Client } from "@notionhq/client";
import mongoose from "mongoose";
import fetch from "node-fetch";
import { OAuth } from "oauth";
import userModel from "../models/user.model";

export const websiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://goodboard-app-41de944b1f08.herokuapp.com"
    : "http://localhost:8080";

export const searchNotion = async (req, res) => {
  // Initializing a client
  const notion = new Client({
    auth: "secret_jtmhIi9fcWbliYPeMBkdkTsQNUEuuMtwVXDi1GZN2s8",
  });
  const response = await notion.search();
  console.log(res, " is the res");
  res.send(response);
};

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

export const createTrelloCard = async (req, res) => {
  const boardId = "6284d2fa63fcfc6011f51a56";
  const title = "hello";
  const description = "this is good";

  /*   const response = await fetch('https://api.trello.com/1/members/me/boards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&lists=open', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  const json = await response.text();
  res.send(json); */

  const data = {
    name: "SOPII JTM TROP BB <3",
    desc: "LOOVE",
  };

  const createCard = await fetch(
    "https://api.trello.com/1/cards?idList=63f9d964c5377bfa7e5d4fd6&key=fcb34c61471e26df9884227677c4682e&token=ATTAce19f202dde1877db891fca2ce329fc3a460770e8a967052bffe6c70bef1bdf8DC9D5940",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

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
  res.send(await createCard.text());
};

export const getOauthTrello = () => {};

const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "GoodBoard ";
const scope = "read,write";
const expiration = "1hour";

const key = "fcb34c61471e26df9884227677c4682e";
const secret =
  "d4cad85ff4c87dbc8fbc275831ad42f2fe6b9ec8fd83bb9316ad8b6e9dd7debd";
const loginCallback = `${websiteUrl}/api/integration/setOauthCodeTrello`;

const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);
const oauth_secrets = {};

export const loginTrello = (request, response) => {
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    oauth_secrets[token] = tokenSecret;
    response.send(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`
    );
  });
};

export const setOauthCodeTrello = async (req, res) => {
  //const query = url.parse(req.url, true).query;
  const token = req.query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = req.query.oauth_verifier;
  oauth.getOAuthAccessToken(
    token,
    tokenSecret,
    verifier,
    async function (error, accessToken, accessTokenSecret, results) {
      // In a real app, the accessToken and accessTokenSecret should be stored
      console.log(accessToken, " is access and secret is ", accessTokenSecret);
      oauth.getProtectedResource(
        "https://api.trello.com/1/members/me/boards",
        "GET",
        accessToken,
        accessTokenSecret,
        async function (error, data, response) {
          const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.user.id },
            {
              trelloAccessToken: accessToken,
              trelloAccessTokenSecret: accessTokenSecret,
            },
            { new: true }
          );

          res.send("<script>window.close()</script>");

          // Now we can respond with data to show that we have access to your Trello account via OAuth
          //res.send(data);
        }
      );
    }
  );
};

export const checkTrelloAuth = async (req, res) => {
  if (req.user.trelloAccessToken) {
    res.send(true);
  }
};

export const getTrelloBoards = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  oauth.getProtectedResource(
    "https://api.trello.com/1/members/me/boards?lists=open",
    "GET",
    user.trelloAccessToken,
    user.trelloAccessTokenSecret,
    function (error, data, response) {
      res.send(data);
    }
  );
};

export const createTrelloCards = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  const { listIds, cardTitle, cardDescription } = req.body;

  for (const listId of listIds) {
    oauth.getProtectedResource(
      `https://api.trello.com/1/cards?key=468adc766d6fcb570b2d3541cb67d612&token=ATTAd17a5782bf43683868129e8c161f248a4045ecbec870d43fba9ba910a42d77c8FE2927C5&name=${cardTitle}&desc=${cardDescription}&idList=${listId}`,
      "POST",
      user.trelloAccessToken,
      user.trelloAccessTokenSecret,
      function (error, data, response) {
        console.log(data, " is the data");
      }
    );
  }
  res.send("ok");
};
