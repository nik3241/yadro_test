import { TestBed } from '@angular/core/testing';

import { WidgetCurrencyValueService } from './widget-currency-value.service';

describe('WidgetCurrencyValueService', () => {
  let service: WidgetCurrencyValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetCurrencyValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
