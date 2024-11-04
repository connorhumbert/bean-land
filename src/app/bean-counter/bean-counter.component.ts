import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output() beanCountReached = new EventEmitter<number>();
  beanCount = 0;
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

    //multiples
    "Get to 100!",
    "Get to 100!",
    "Get to 100!",
  ];

  displayedPhrase = 'Get to 100!';
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
  displayedBeans: BeanImage[] = [];

  incrementBeans() {
    this.beanCount++;

    if (this.beanCount === 10) {
      this.beanCountReached.emit(this.beanCount);
      return; 
    }  else if (this.beanCount === 200) {
      window.open('https://www.youtube.com/watch?v=vSJCuu29rZs&ab_channel=BBC', '_blank');
      return; 
    } else if (this.beanCount === 300) {
      window.open('https://www.youtube.com/watch?v=uSsvZe9Hw0c&ab_channel=JustPao13', '_blank');
      return; 
    } else if (this.beanCount == 400) {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', '_blank');
      return; 
    }

    // Show a random phrase and image every 5 beans
    if (this.beanCount % 5 === 0) {
      const randomIndex = Math.floor(Math.random() * this.beans.length);
      const randomTop = Math.random() * 80; 
      const randomLeft = Math.random() * 80; 
      
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