import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { IQuotes, QuotesLive, Quotes } from "../models/widget-currency-value.models"
import { Observable } from 'rxjs';
import {Freecurrencyapi} from '@everapi/freecurrencyapi-js';

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
  dataQuotes!: IQuotes;
  APIkey = "7fuk7lQvRXyvUMhQvz3kGiXJ3K2StGXE";
  APIURL = "https://api.apilayer.com/currency_data/live";
  apiApp = new Freecurrencyapi('YOUR-API-KEY');

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
      // .set("Access-Control-Allow_Origin", '*')
      .set("Access-Control-Allow-Headers", "Accept,Content-Length,Content-Type,apikey,Origin")
      .set("apikey", this.APIkey,)
      .set("redirect", "follow",)
      .set("responseType", "json")

    // let reqDataLive: HttpRequest<HttpEvent<IQuotes>> =
    //   new HttpRequest("GET",
    //     this.APIURL, {
    //       headers: myHeaders,
    //       params:myParams
    //   });

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

  getData():Observable<any>{
    return this.http.get<any>(
      "https://app.freecurrencyapi.com/v1/latest?base_currency=RUB&currencies=usd,eur,gbp",
      {headers: {"apikey": "fca_live_bbo7xP1x25A9Fbj6m6ClsOaL9Tx2mh30dK3k0P1s"}}
    )
  }
  setDataQuotes(data: IQuotes): void {
    this.dataQuotes = data;
  }
}
