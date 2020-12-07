import http from "http";
import express from "express";
import { compute } from "./compute";

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  let game = request.body.game;
  if(!isGame(game))
    response.status(400).json({message: "Invalid game data"});
  else {
    try {
      const score = compute(game);
      response.status(200).json({ score: score });
    }
    catch (e) {
      response.status(500).json({message: "Something went wrong"});
    }
  }
});

const isGame =(game) => {
  if(game.length != 10) return false;
  for(let i = 0; i < game.flat().length; i++)
    if(typeof game.flat()[i] !== 'number') return false;
  for(let i = 0; i < 9; i++)
    if(game[i].length != 2) return false;
  if(game[9].length != 3) return false;
  return true;
};

export const createServer = () => http.createServer(app);
