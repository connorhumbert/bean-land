import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanCounterComponent } from './bean-counter.component';

describe('BeanCounterComponent', () => {
  let component: BeanCounterComponent;
  let fixture: ComponentFixture<BeanCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeanCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeanCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
