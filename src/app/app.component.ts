import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeanCounterComponent } from './bean-counter/bean-counter.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BeanCounterComponent, TicTacToeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bean-land';
  showCongratsModal = false;

  onBeanCountReached(count: number) {
    if (count === 10) {
      this.showCongratsModal = true; // Show modal when count reaches 100
    }
  }

  closeModal() {
    this.showCongratsModal = false; // Function to close modal
  }
}
