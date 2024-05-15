import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { IQuotes, QuotesLive, Quotes } from "../models/widget-currency-value.models"
import { Observable } from 'rxjs';


const data = {
  "quotes": {
    "USDAUD": 1.278342,
    "USDEUR": 1.278342,
    "USDGBP": 0.908019,
    "USDPLN": 3.731504
  },
  "source": "USD",
  "success": true,
  "timestamp": 1432400348
}

@Injectable({
  providedIn: 'root'
})
export class WidgetCurrencyValueService {
  dataQuotes!: QuotesLive;
  APIkey = "7fuk7lQvRXyvUMhQvz3kGiXJ3K2StGXE";
  APIURL = "https://api.apilayer.com/currency_data/live";


  constructor(private http: HttpClient) {
    let dataQuotes1$ = this.getDataLive("RUB", ["USD", "EUR", "GBR"]);
    console.log(dataQuotes1$);

  }

  getDataLive(source: string, currencies: string[]): Observable<QuotesLive> {


    let myParams = new HttpParams()
      .set("source", source)
      .set("currencies", currencies.toString().replaceAll(' ', ''));


    let myHeaders = new HttpHeaders()
      .set("Access-Control-Allow-Credentials", "true")
      .set("Access-Control-Allow-Headers", "Accept, Content - Length, Content - Type, apikey, Origin")
      .set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
      .set("Access-Control-Allow-Origin", "http://localhost:4200")
      .set("Access-Control-Allow-Headers", "Accept,Content-Length,Content-Type,apikey,Origin")
      .set("apikey", this.APIkey,)
      .set("redirect", "follow",)
      .set("responseType", "json")

    let requestOptions = {
      headers: myHeaders,
      params: myParams
    };

    console.log("requestOptions:", requestOptions);


    return this.http.get<QuotesLive>(
      this.APIURL,
      requestOptions
    );
  }


  setDataQuotes(data: QuotesLive): void {
    this.dataQuotes = data;
  }
}
