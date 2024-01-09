import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEnrollComponent } from './player-enroll.component';

describe('PlayerEnrollComponent', () => {
  let component: PlayerEnrollComponent;
  let fixture: ComponentFixture<PlayerEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayerEnrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
