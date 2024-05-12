import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'widget-currency-value',
  standalone: true,
  imports: [],
  templateUrl: './widget-currency-value.component.html',
  styleUrl: './widget-currency-value.component.scss'
})
export class WidgetCurrencyValueComponent implements OnInit, OnDestroy {
  title = "Конвертер валют"
  sourse = "RUB";
  moreCurrency = ["CNY", "JPY", "TRY"];
  dateTime = "";
  private dateTimeInterval = setInterval(() => {
    this.dateTime = moment().format('DD.MM.YYYY HH:mm:ss')
    // console.log(typeof this.dateTimeInterval);
    // console.log(this.dateTime)
  },
    990);
  // defaultCurrencys = ["USD", "EUR", "GBR"];
  currencys = ["USD", "EUR", "GBR"];

  ngOnInit(): void {
    // this.currentDataTime();
  }



  ngOnDestroy(): void {
    clearInterval(this.dateTimeInterval);
  }
}
