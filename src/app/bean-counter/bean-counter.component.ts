import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BeanImage {
  src: string;
  top: number;
  left: number;
}

@Component({
  selector: 'app-bean-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bean-counter.component.html',
  styleUrls: ['./bean-counter.component.scss']
})
export class BeanCounterComponent {
  beanCount = 0;
  randomPhrases: string[] = [
    "You’re on a roll!",
    "Keep counting those beans!",
    "Beans for days!",
    "Aren't you the bean master?",
    "This is quite the bean journey!",
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
    "Bean whisperer, is that you?",
    "Beans are your destiny!",
    "Your future: beans!",
    "Are you sure you’re not a bean hoarder?",
    "They said it couldn’t be done. They were wrong.",
    "Next stop: Bean World!",
    "You’ve unlocked Bean Power!",
    "Click. Count. Bean. Repeat.",
    "Bean-crazed and proud!",
  ];
  displayedPhrase = '';
  beans: string[] = [
     '/beans1.jpg',
     '/beans2.webp'
  ];
  displayedBeans: BeanImage[] = [];

  incrementBeans() {
    this.beanCount++;

    // Show a random phrase and image every 5 beans
    if (this.beanCount % 5 === 0) {
      const randomIndex = Math.floor(Math.random() * this.beans.length);
      const randomTop = Math.random() * 80; // Adjust as needed for screen height
      const randomLeft = Math.random() * 80; // Adjust as needed for screen width
      
      // Display a random phrase
      const phraseIndex = Math.floor(Math.random() * this.randomPhrases.length);
      this.displayedPhrase = this.randomPhrases[phraseIndex];
      
      // Add the bean image with random position
      this.displayedBeans.push({
        src: this.beans[randomIndex],
        top: randomTop,
        left: randomLeft
      });

      // Remove the bean image after 3 seconds
      setTimeout(() => {
        this.displayedBeans.shift();
      }, 5000);
    }
  }
}