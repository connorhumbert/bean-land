import { CommonModule } from '@angular/common';
import { Component, afterNextRender, inject, signal } from '@angular/core';
import confetti from 'canvas-confetti';
import { BeanStorage } from '../bean-storage';

interface Score {
  you: number;
  bean: number;
  draws: number;
}

const SCORE_KEY = 'bbb-score';
const EMPTY_SCORE: Score = { you: 0, bean: 0, draws: 0 };

const isScoreField = (value: unknown) => Number.isInteger(value) && (value as number) >= 0 && (value as number) <= 1_000_000;
const isScore = (value: unknown): value is Score =>
  typeof value === 'object' && value !== null &&
  ['you', 'bean', 'draws'].every((field) => isScoreField((value as Record<string, unknown>)[field]));

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

const TAUNTS = [
  "Is that all you've got, coffee bean?",
  "I'm not just a kidney bean. I'm THE kidney bean.",
  "Calculated. Legumely.",
  "You call that a move? I call that a snack.",
  "I've seen pinto beans play better.",
  "Spill the beans: you're nervous.",
  "Fresh out of the can and still winning.",
  "Interesting choice. Wrong, but interesting.",
  "My chili is going to taste like victory.",
  "Beans don't sweat. But you do.",
];

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  private storage = inject(BeanStorage);

  board: (string | null)[] = Array(9).fill(null);
  playerIcon = '/coffee_bean.avif';
  opponentIcon = '/single_kidney_bean.jpg';
  isPlayerTurn = true; // Track whether it's the player's turn
  winner: string | null = null;
  winningLine: number[] = [];
  isGameOver = false;
  PLAYER: string = 'Player'
  OPPONENT: string = 'Opponent'

  taunt = 'Your move, coffee bean.';
  score = signal<Score>(EMPTY_SCORE);

  constructor() {
    afterNextRender(() => {
      this.score.set(this.storage.load(SCORE_KEY, EMPTY_SCORE, isScore));
    });
  }

  playerMove(index: number): void {
    if (!this.isPlayerTurn || this.board[index] || this.isGameOver) return;

    this.board[index] = this.PLAYER;  // Player's move
    this.isPlayerTurn = false; // Set to false to prevent further clicks
    this.taunt = 'Hmm… 🤔';
    this.checkWinner();

    if (!this.isGameOver) {
      setTimeout(() => this.programMove(), 600);  // Delay to simulate the program's turn
    }
  }

  // Method for the program's intelligent move
  programMove(): void {
    if (this.isGameOver) return;

    // Try to win or block
    let move = this.findWinningMove(this.OPPONENT) ?? this.findWinningMove(this.PLAYER);

    // Take the center if available
    if (move === null && this.board[4] === null) {
      move = 4;
    }

    // Otherwise, take a random move
    if (move === null) {
      const availableSpots = this.board
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((idx) => idx !== null) as number[];

      move = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }

    // Place the move and check for a winner
    if (move !== null) {
      this.board[move] = this.OPPONENT;
      this.taunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
      this.checkWinner();
      this.isPlayerTurn = true;
    }
  }

  // Helper function to find a winning or blocking move
  findWinningMove(player: string): number | null {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      const line = [this.board[a], this.board[b], this.board[c]];
      const emptyIndex = line.indexOf(null);

      if (line.filter(cell => cell === player).length === 2 && emptyIndex !== -1) {
        return [a, b, c][emptyIndex];
      }
    }

    return null;
  }

  // Check for winner or draw
  checkWinner(): void {
    for (const line of WINNING_COMBINATIONS) {
      const [a, b, c] = line;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        this.winningLine = line;
        this.isGameOver = true;

        if (this.winner === this.PLAYER) {
          this.taunt = "Impossible… I've been… ground. ☠️";
          this.recordResult('you');
          this.triggerConfetti(); // Trigger confetti if player wins
        } else {
          this.taunt = 'GG. Go brew yourself a better strategy. ☕';
          this.recordResult('bean');
        }
        return;
      }
    }

    if (this.board.every(cell => cell)) {
      this.winner = 'Draw';
      this.isGameOver = true;
      this.taunt = 'A stalemate. Like beans in a jar.';
      this.recordResult('draws');
    }
  }

  get resultText(): string {
    if (this.winner === this.PLAYER) return 'You win! 🎉';
    if (this.winner === this.OPPONENT) return 'The Kidney Bean wins 😤';
    return "It's a draw!";
  }

  triggerConfetti() {
    const duration = 2 * 2000;
    const animationEnd = Date.now() + duration;
    const colors = ['#c98a4b', '#e0607e', '#3b2418', '#e9d5b7'];

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
      }

      confetti({
        particleCount: 200,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors
      });
    }, 250);
  }

  // Reset the game
  resetGame(): void {
    this.board = Array(9).fill(null);
    this.isPlayerTurn = true;
    this.winner = null;
    this.winningLine = [];
    this.isGameOver = false;
    this.taunt = 'Rematch? Bring it on.';
  }

  private recordResult(field: keyof Score) {
    this.score.update((score) => ({ ...score, [field]: score[field] + 1 }));
    this.storage.save(SCORE_KEY, this.score());
  }
}
