import { Component, HostListener, inject } from '@angular/core';
import confetti from 'canvas-confetti';
import { BeanCounterComponent } from './bean-counter/bean-counter.component';
import { BeanFortuneComponent } from './bean-fortune/bean-fortune.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { BeanStorage } from './bean-storage';

interface RainDrop {
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const CELEBRATION_MS = 15000; // 15 seconds

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BeanCounterComponent, BeanFortuneComponent, TicTacToeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bean-land';
  showCongratsModal = false;
  queenLetters = [...'Queen of Beans'];
  rain: RainDrop[] = [];
  private storage = inject(BeanStorage);
  private closeTimer?: ReturnType<typeof setTimeout>;

  onBeanCountReached(count: number) {
    this.rain = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      size: 1.2 + Math.random() * 1.6,
    }));
    this.showCongratsModal = true; // Show modal when count reaches 100
    this.burstConfetti();

    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => this.closeModal(), CELEBRATION_MS);
  }

  @HostListener('document:keydown.escape')
  closeModal() {
    this.showCongratsModal = false; // Function to close modal
    clearTimeout(this.closeTimer);
  }

  resetBeans() {
    if (!confirm('Reset all your beans and your Bean Bac Boe record? This cannot be undone.')) return;
    this.storage.clearAll();
    location.reload();
  }

  private burstConfetti() {
    const colors = ['#c98a4b', '#e0607e', '#fff8ee', '#e9d5b7'];
    const fire = (x: number) =>
      confetti({ particleCount: 120, spread: 80, startVelocity: 55, origin: { x, y: 0.9 }, colors, zIndex: 1000 });
    fire(0.2);
    fire(0.8);
    setTimeout(() => fire(0.5), 600);
  }
}
