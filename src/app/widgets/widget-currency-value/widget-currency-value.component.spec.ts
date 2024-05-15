import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCurrencyValueComponent } from './widget-currency-value.component';

describe('WidgetCurrencyValueComponent', () => {
  let component: WidgetCurrencyValueComponent;
  let fixture: ComponentFixture<WidgetCurrencyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetCurrencyValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetCurrencyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
