/*Problem 1 
Rock Paper Scissors is a game between two players. Each game contains many rounds; in 
each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a 
hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats 
Paper, and Paper defeats Rock. If both players choose the same shape, the round instead 
ends in a draw.
You are given an encrypted strategy guide (your input) that will help you win. In the input 
The first column is what your opponent is going to play:
• A for Rock
• B for Paper
• C for Scissors.
The second column is what you should play in response:
• X for Rock,
• Y for Paper,
• Z for Scissors.
The winner of the whole tournament is the player with the highest score. Your total score is 
the sum of your scores for each round. The score for a single round is the score for the shape 
you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the 
round (0 if you lost, 3 if the round was a draw, and 6 if you won).
For example, suppose you were given the following strategy guide:
A Y
B X
C Z
This strategy guide predicts and recommends the following:
In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). 
This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you
won). In the second round, your opponent will choose Paper (B), and you should choose 
Rock (X). This ends in a loss for you with a score of 1 (1 + 0). The third round is a draw with 
both players choosing Scissors, giving you a score of 3 + 3 = 6. In this example, if you were to 
follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).
What would your total score be if everything goes exactly according to your strategy guide*/


const fs = require('fs');
const path = require('path');

// Calculate rounds 
const calculateRounds = (opponent, player) => {
	const moves = {
		A: 1, // Rock
		B: 2, // Paper
		C: 3, // Scissors

		X: 1, // Rock
		Y: 2, // Paper
		Z: 3, // Scissors
	};
	const opponentMove = moves[opponent];
	const playerMove = moves[player];

	// If draw it's 3 points + move
	if (opponentMove === playerMove) return 3 + playerMove;

	//   Rock (1) beats Scissors (3)                 Paper (2) beats Rock (1),                    Scissors (3) beats Paper (2)
	if ((playerMove === 1 && opponentMove === 3) || (playerMove === 2 && opponentMove === 1) || (playerMove === 3 && opponentMove === 2)) return 6 + playerMove;

	// else its a loss + move
	return playerMove; // Loss
};

// Read file
const input = path.join(__dirname, 'input.txt');
const inputFile = fs.readFileSync(input, 'utf8');

// Rm whitespace 
const lines = inputFile.trim().split('\n');
// Reconstrucutre file to have oppenant and player and there moves
const gameBoard = lines.map(line => {
	const [opponent, player] = line.split(' ');
	return { opponent, player };
});

// Start counting
let totalScore = 0;

// For every line, call function och calculate
for (const round of gameBoard) {
	const roundPoints = calculateRounds(round.opponent, round.player);
	totalScore += roundPoints;
}
console.log(totalScore);

// Totalscore of input file is 15691