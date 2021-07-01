import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyberTokenComponent } from './kyber-token.component';

describe('KyberTokenComponent', () => {
  let component: KyberTokenComponent;
  let fixture: ComponentFixture<KyberTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyberTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyberTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
