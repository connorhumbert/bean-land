import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanFortuneComponent } from './bean-fortune.component';
import { FORTUNES, dailyFortune } from './fortunes';

describe('BeanFortuneComponent', () => {
  let component: BeanFortuneComponent;
  let fixture: ComponentFixture<BeanFortuneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeanFortuneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeanFortuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('dailyFortune', () => {
  it('gives the same fortune all day', () => {
    const morning = dailyFortune(new Date(2026, 9, 30, 8, 0));
    const evening = dailyFortune(new Date(2026, 9, 30, 22, 30));
    expect(evening).toEqual(morning);
    expect(FORTUNES).toContain(morning.text);
  });

  it('varies across days', () => {
    const texts = new Set<string>();
    for (let day = 1; day <= 30; day++) {
      texts.add(dailyFortune(new Date(2026, 10, day)).text);
    }
    expect(texts.size).toBeGreaterThan(10);
  });
});
