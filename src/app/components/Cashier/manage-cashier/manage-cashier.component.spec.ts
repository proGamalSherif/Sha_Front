import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCashierComponent } from './manage-cashier.component';

describe('ManageCashierComponent', () => {
  let component: ManageCashierComponent;
  let fixture: ComponentFixture<ManageCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCashierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
