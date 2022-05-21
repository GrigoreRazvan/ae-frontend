import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportComenziZiComponent } from './raport-comenzi-zi.component';

describe('RaportComenziZiComponent', () => {
  let component: RaportComenziZiComponent;
  let fixture: ComponentFixture<RaportComenziZiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaportComenziZiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportComenziZiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
