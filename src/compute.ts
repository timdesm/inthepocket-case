import { Game } from "./types";

export function compute(game: Game): any {
  let points = Bowling.calculate(game);
  return points.reduce((a, b) => a + b, 0);
}

const Bowling = {
  calculate: (rounds) => {
    let points = [];
    rounds.forEach((round, index) => {
      if(index > 9) return;
      points.push(Bowling.getPoints(round, index, rounds, (index + 2)));
    });
    return points;
  },
  getPoints: (round, index, rounds, limit) => {
    let score = round[0];
    if(!Bowling.isLast(index, rounds) || index < limit)
      score += round[1];
    if(Bowling.isLast(index, rounds) && index + 2 == limit)
      score += round[2];
    else if(Bowling.isStrike(round) && (index < limit && index < 10 && !Bowling.isLast(index, rounds)))
      score += Bowling.getPoints(rounds[index + 1], (index + 1), rounds, limit);
    else if(Bowling.isSpare(round) && !Bowling.isLast(index, rounds))
      score += rounds[index + 1][0];
    return score;
  },
  isStrike: (round) => {
    return round[0] === 10;
  },
  isSpare: (round) => {
    return round[0] < 10 && round[0] + round[1] ===10;
  },
  isLast: (index, array) => {
    return index + 1 === array.length;
  }
};