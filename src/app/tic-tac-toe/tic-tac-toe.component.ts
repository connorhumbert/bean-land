import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  board: (string | null)[] = Array(9).fill(null);
  playerIcon = '/coffee_bean.avif';  
  opponentIcon = '/single_kidney_bean.jpg';
  isPlayerTurn = true; // Track whether it's the player's turn
  winner: string | null = null;
  isGameOver = false;

  // Method to handle player move
  playerMove(index: number): void {
    if (!this.isPlayerTurn || this.board[index] || this.isGameOver) return;

    this.board[index] = 'X';  // Player's move
    this.isPlayerTurn = false; // Set to false to prevent further clicks
    this.checkWinner();

    if (!this.isGameOver) {
      setTimeout(() => this.programMove(), 500);  // Delay to simulate the program's turn
    }
  }

  // Method for the program's intelligent move
  programMove(): void {
    if (this.isGameOver) return;

    // Try to win or block
    let move = this.findWinningMove('O') || this.findWinningMove('X');
    
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
      this.board[move] = 'O';
      this.checkWinner();
      this.isPlayerTurn = true; // Now it's the player's turn again
    }
  }

  // Helper function to find a winning or blocking move
  findWinningMove(player: string): number | null {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
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
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const [a, b, c] of winningCombinations) {
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        this.isGameOver = true;

        // Check if the winner is the player (X)
        if (this.winner === 'X') {
          this.triggerConfetti(); // Trigger confetti if player wins
        }
        return;
      }
    }

    if (this.board.every(cell => cell)) {
      this.winner = 'Draw';
      this.isGameOver = true;
    }
  }

  triggerConfetti() {
    const duration = 2 * 2000;
    const animationEnd = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#00ff00'];

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
    this.isGameOver = false;
  }
}
