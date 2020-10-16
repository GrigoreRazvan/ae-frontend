import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdusNouComponent } from './produs-nou.component';

describe('ProdusNouComponent', () => {
  let component: ProdusNouComponent;
  let fixture: ComponentFixture<ProdusNouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdusNouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdusNouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
