import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaugaProduseDialogComponent } from './adauga-produse-dialog.component';

describe('AdaugaProduseDialogComponent', () => {
  let component: AdaugaProduseDialogComponent;
  let fixture: ComponentFixture<AdaugaProduseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaugaProduseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaugaProduseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
