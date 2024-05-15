import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';

import { WidgetCurrencyValueService } from '../services/widget-currency-value.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'widget-currency-value',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './widget-currency-value.component.html',
  styleUrl: './widget-currency-value.component.scss',
  providers: [WidgetCurrencyValueService],
})
export class WidgetCurrencyValueComponent implements OnInit, OnDestroy {
  title: string = "Конвертер валют";

  sourse: string = "RUB";
  defaultCurrencys: string[] = ["USD", "EUR", "GBR"];
  currencies: string[] = ["USD", "EUR", "GBR"];
  otherCurrency: String[] = ["CNY", "JPY", "TRY"];
  dateTime: string = "";

  private dateTimeInterval!: any;
  private subscribes$!: Subscription;

  constructor(private WCVService: WidgetCurrencyValueService) { }

  ngOnInit(): void {
    this.dateTimeInterval = setInterval(
      () => this.dateTime = moment().format('DD.MM.YYYY HH:mm:ss'),
      990
    );

    this.subscribes$ = this.WCVService.getDataLive(this.sourse, this.currencies)
      .subscribe({
        next: (value) => {
          console.log('value', value);
        },
        error: (err) => {
          console.error("Моя ошибка", err.name, err)
        },
        complete() {
          console.info("подписка на данные сервиса виджета котировок валюты")
        }

      });
  }



  ngOnDestroy(): void {
    clearInterval(this.dateTimeInterval);
    if (this.subscribes$)
      this.subscribes$.unsubscribe()
  }
}
