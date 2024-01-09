import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachEventsComponent } from './coach-events.component';

describe('CoachEventsComponent', () => {
  let component: CoachEventsComponent;
  let fixture: ComponentFixture<CoachEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
