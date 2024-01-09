import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledPlayersComponent } from './enrolled-players.component';

describe('EnrolledPlayersComponent', () => {
  let component: EnrolledPlayersComponent;
  let fixture: ComponentFixture<EnrolledPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrolledPlayersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrolledPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
