import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeanCounterComponent } from './bean-counter/bean-counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BeanCounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bean-land';
}
