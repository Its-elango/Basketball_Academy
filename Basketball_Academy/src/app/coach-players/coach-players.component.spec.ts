import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPlayersComponent } from './coach-players.component';

describe('CoachPlayersComponent', () => {
  let component: CoachPlayersComponent;
  let fixture: ComponentFixture<CoachPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoachPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoachPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
