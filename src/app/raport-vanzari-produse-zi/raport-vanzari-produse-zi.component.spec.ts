import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportVanzariProduseZiComponent } from './raport-vanzari-produse-zi.component';

describe('RaportVanzariProduseZiComponent', () => {
  let component: RaportVanzariProduseZiComponent;
  let fixture: ComponentFixture<RaportVanzariProduseZiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportVanzariProduseZiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportVanzariProduseZiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
