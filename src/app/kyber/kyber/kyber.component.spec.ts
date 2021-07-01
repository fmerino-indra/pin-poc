import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyberComponent } from './kyber.component';

describe('KyberComponent', () => {
  let component: KyberComponent;
  let fixture: ComponentFixture<KyberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
