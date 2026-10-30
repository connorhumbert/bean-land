import { Component, Output, EventEmitter, afterNextRender, computed, inject, signal } from '@angular/core';
import { BeanStorage, isBeanCount } from '../bean-storage';

interface BeanImage {
  id: number;
  src: string;
  top: number;
  left: number;
  rotate: number;
}

interface BeanPop {
  id: number;
  x: string;
}

interface Phrase {
  id: number;
  text: string;
}

const MILESTONES = [100, 200, 300, 400];
const COUNT_KEY = 'count';

@Component({
  selector: 'app-bean-counter',
  standalone: true,
  templateUrl: './bean-counter.component.html',
  styleUrls: ['./bean-counter.component.scss']
})
export class BeanCounterComponent {
  @Output() beanCountReached = new EventEmitter<number>();
  private storage = inject(BeanStorage);
  private nextId = 0;

  beanCount = signal(0);

  nextMilestone = computed(() => MILESTONES.find((m) => m > this.beanCount()) ?? null);

  progress = computed(() => {
    const next = this.nextMilestone();
    if (next === null) return 100;
    const previous = MILESTONES[MILESTONES.indexOf(next) - 1] ?? 0;
    return ((this.beanCount() - previous) / (next - previous)) * 100;
  });

  milestoneNudge = computed(() => {
    const next = this.nextMilestone();
    return next === null ? 'Bean-finity and beyond!' : `Get to ${next}!`;
  });

  randomPhrases: string[] = [
    "You’re on a roll!",
    "Keep counting those beans!",
    "Beans for days!",
    "Aren't you the bean master?",
    "Girl! You deserve a bean!",
    "BEANS! BEANS! BEANS!",
    "Bean there, done that!",
    "One bean closer to greatness!",
    "Counting beans like a pro!",
    "Bean-counting legend in the making!",
    "Are you a bean wizard?",
    "This bean train has no brakes!",
    "Another bean bites the dust!",
    "Beans, beans, and more beans!",
    "Who knew beans could be so exciting?",
    "Welcome to the bean party!",
    "Bean collector extraordinaire!",
    "Bean whisperer.",
    "Beans are your destiny!",
    "Your future: beans!",
    "Are you sure you’re not a bean hoarder?",
    "They said it couldn’t be done. They were wrong.",
    "Next stop: Bean World!",
    "You’ve unlocked Bean Power!",
    "Bean-crazed and proud!",
    "YEAAAAAAAAAAAAAAA",
  ];

  // Kept as a one-item list so the bubble re-animates whenever the phrase changes
  phrase = signal<Phrase[]>([{ id: 0, text: this.milestoneNudge() }]);

  beans: string[] = [
     '/beans1.jpg',
     '/beans2.webp',
     '/beans3.webp',
     '/beans4.jpg',
     '/beans5.jpg',
     '/beans6.jpg',
     '/beans7.jpeg',
     '/beans8.jpg',
     '/beans9.jpeg',
     '/beans10.jpg',
     '/beans11.webp',
     '/beans12.jpg',
     '/beans13.jpg',
     '/beans14.webp',
     '/mr-bean.jpg'
  ];
  displayedBeans = signal<BeanImage[]>([]);
  pops = signal<BeanPop[]>([]);

  constructor() {
    // Read saved beans only in the browser, after hydration
    afterNextRender(() => {
      this.beanCount.set(this.storage.load(COUNT_KEY, 0, isBeanCount));
      this.phrase.set([{ id: this.nextId++, text: this.milestoneNudge() }]);
    });
  }

  incrementBeans() {
    this.beanCount.update((count) => count + 1);
    const count = this.beanCount();
    this.storage.save(COUNT_KEY, count);
    this.spawnPop();

    if (count === 100) {
      this.beanCountReached.emit(count);
      return;
    } else if (count === 200) {
      window.open('https://www.youtube.com/watch?v=vSJCuu29rZs&ab_channel=BBC', '_blank');
      return;
    } else if (count === 300) {
      window.open('https://www.youtube.com/watch?v=uSsvZe9Hw0c&ab_channel=JustPao13', '_blank');
      return;
    } else if (count === 400) {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', '_blank');
      return;
    }

    // Show a random phrase and image every 5 beans
    if (count % 5 === 0) {
      // The milestone nudge is listed twice so it shows up more often
      const nudge = this.milestoneNudge();
      const phrases = [...this.randomPhrases, nudge, nudge];
      const phraseIndex = Math.floor(Math.random() * phrases.length);
      this.phrase.set([{ id: this.nextId++, text: phrases[phraseIndex] }]);

      const bean: BeanImage = {
        id: this.nextId++,
        src: this.beans[Math.floor(Math.random() * this.beans.length)],
        top: 5 + Math.random() * 60,
        left: Math.random() * 65,
        rotate: Math.random() * 24 - 12
      };
      this.displayedBeans.update((beans) => [...beans, bean]);

      // Remove the bean image after 5 seconds
      setTimeout(() => {
        this.displayedBeans.update((beans) => beans.filter((b) => b.id !== bean.id));
      }, 5000);
    }
  }

  removePop(id: number) {
    this.pops.update((pops) => pops.filter((p) => p.id !== id));
  }

  private spawnPop() {
    const pop = { id: this.nextId++, x: `${Math.round(Math.random() * 80 - 40)}px` };
    this.pops.update((pops) => [...pops, pop]);
  }
}
