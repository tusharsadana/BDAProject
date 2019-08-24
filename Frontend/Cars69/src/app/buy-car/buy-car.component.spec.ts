import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarComponent } from './buy-car.component';

describe('BuyCarComponent', () => {
  let component: BuyCarComponent;
  let fixture: ComponentFixture<BuyCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
