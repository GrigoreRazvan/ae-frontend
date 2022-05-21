import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniuPrincipalComponent } from './meniu-principal.component';

describe('MeniuPrincipalComponent', () => {
  let component: MeniuPrincipalComponent;
  let fixture: ComponentFixture<MeniuPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniuPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniuPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
