import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bean-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bean-counter.component.html',
  styleUrl: './bean-counter.component.scss'
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
    "BEANS! BEANS! BEANS!"
  ];
  displayedPhrase = '';
  beans: string[] = [
    // 'assets/beans1.jpg',
    'https://www.allrecipes.com/thmb/tE5ZL6uNVnvGCUc7_owawWtPYvE=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ALR-165249-baked-beans-from-scratch-VAT-4x3-3f47fbc5e1554dc4b34fa8a567f39dd1.jpg'
  ];
  currentBean: string | null = null;
  showBean = false;

  incrementBeans() {
    this.beanCount++;
    this.showBean = true;

    // Display a random bean image
    const randomIndex = Math.floor(Math.random() * this.beans.length);
    this.currentBean = this.beans[randomIndex];

    // Show a phrase every 5 beans
    if (this.beanCount % 5 === 0) {
      const phraseIndex = Math.floor(Math.random() * this.randomPhrases.length);
      this.displayedPhrase = this.randomPhrases[phraseIndex];
    }

    // Fade out the bean image after 2 seconds
    setTimeout(() => {
      this.showBean = false;
      this.currentBean = null;
    }, 2000);
  }
}
