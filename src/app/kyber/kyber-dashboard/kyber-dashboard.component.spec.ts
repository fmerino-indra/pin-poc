import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KyberDashboardComponent } from './kyber-dashboard.component';

describe('KyberDashboardComponent', () => {
  let component: KyberDashboardComponent;
  let fixture: ComponentFixture<KyberDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KyberDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KyberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
