import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyberPinComponent } from './kyber-pin.component';

describe('KyberPinComponent', () => {
  let component: KyberPinComponent;
  let fixture: ComponentFixture<KyberPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyberPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyberPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
