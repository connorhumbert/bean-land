import { Component, signal } from '@angular/core';
import { Fortune, dailyFortune } from './fortunes';

const SHAKE_MS = 700;

@Component({
  selector: 'app-bean-fortune',
  standalone: true,
  templateUrl: './bean-fortune.component.html',
  styleUrls: ['./bean-fortune.component.scss']
})
export class BeanFortuneComponent {
  fortune = signal<Fortune | null>(null);
  shaking = signal(false);

  // The date is read on tap (in the browser), so the server and client never disagree
  revealDaily() {
    this.shake(() => dailyFortune(new Date()));
  }

  private shake(pick: () => Fortune) {
    if (this.shaking()) return;
    this.shaking.set(true);
    setTimeout(() => {
      this.fortune.set(pick());
      this.shaking.set(false);
    }, SHAKE_MS);
  }
}
